import { create } from 'zustand'
import todoService from '../services/todos'

const mapUpdatedTodo = (todos, id, updatedTodo) => (
    todos.map(todo => todo.id === id ? updatedTodo : todo)
)

const useTodoStore = create((set, get) => ({
    currentPage: 1,
    pageSize: 10,
    totalPages: 0,

    todos: [],
    allTodos: [],

    statusFilter: 'all',
    sortOrder: 'asc',

    fetchTodosPage: async (page) => {
        const { pageSize, statusFilter, sortOrder } = get()

        const returnedPage = await todoService.getPage(page, pageSize, statusFilter, sortOrder)
        const { data, ...info } = returnedPage

        set(() => ({
            todos: data,
            totalPages: info.totalPages,
            currentPage: page
        }))
    },

    addTodo: async (title, description) => {
        try {
            const newTodo = {
                title,
                description,
                status: 'pending',
                remark: '',
                overdue: 'false',
                createdAt: new Date(),
            }
            
            await todoService.create(newTodo)
            await get().fetchTodosPage(get().currentPage)
        } catch (error) {
            console.error(`Couldn't add todo:`, error)
        }
    },

    deleteTodo: async (id) => {
        try {
            await todoService.remove(id)
            const { currentPage } = get()
            await get().fetchTodosPage(currentPage)
        } catch (error) {
            console.error(`Couldn't delete todo:`, error)
        }
    },

    editTodo: async (id, newTitle, newDescription, newStatus, newRemark) => {
        const returnedTodo = await todoService.update(id, {
            title: newTitle,
            description: newDescription,
            status: newStatus,
            remark: newRemark,
        })
        set(({ todos }) => {
            console.log('changed todos...', mapUpdatedTodo(todos, id, returnedTodo))
            return { todos: mapUpdatedTodo(todos, id, returnedTodo) }
        })
    },

    updateStatus: async (id, newStatus) => {
        const returnedTodo = await todoService.update(id, {
            status: newStatus
        })
        set (({ todos }) => ({
            todos: mapUpdatedTodo(todos, id, returnedTodo)
        }))
    },

    setFilter: async (status) => {
        const firstPage = await todoService.getPage(1, get().pageSize, status)

        set({
            todos: firstPage.data,
            totalPages: firstPage.totalPages,
            currentPage: 1,
            statusFilter: status,
        })
    },

    sortTodos: async (sortOrder) => {
        set({ sortOrder: sortOrder })
        await get().fetchTodosPage(1)
    },

    searchTodos: (searchTerm) => {
        const { allTodos } = get()

        const searchResult = allTodos.filter(todo => (
            todo.title.toLowerCase().includes(searchTerm.toLowerCase())
            || todo.description.toLowerCase().includes(searchTerm.toLowerCase())
            || todo.remark.toLowerCase().includes(searchTerm.toLowerCase())
        ))

        set({
            todos: searchResult,
            searchTerm: searchTerm
        })
    },
}))

export default useTodoStore