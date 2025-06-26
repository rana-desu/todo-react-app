import { create } from 'zustand'
import todoService from '../services/todos'

const mapUpdatedTodo = (todos, id, updatedTodo) => (
    todos.map(todo => todo.id === id ? updatedTodo : todo)
)

const useTodoStore = create((set, get) => ({
    currentPage: 1,
    pageSize: 5,
    totalPages: 0,

    todos: [],
    categories: [],

    statusFilter: 'all',
    sortOrder: 'asc',
    searchBy: 'title',
    searchTerm: '',

    fetchTodosPage: async (page) => {
        const { searchBy, searchTerm, statusFilter, pageSize, sortOrder } = get()

        const returnedPage = await todoService.getPage(searchBy, searchTerm, statusFilter, page, pageSize, sortOrder)
        const { data, ...info } = returnedPage

        set(() => ({
            todos: data,
            totalPages: info.totalPages,
            currentPage: page
        }))
    },

    addTodo: async (title, description, categories) => {
        try {
            const newTodo = {
                title,
                description,
                status: 'pending',
                categories,
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
        set({ statusFilter: status })

        get().fetchTodosPage(1)
    },

    sortTodos: async (sortOrder) => {
        set({ sortOrder: sortOrder })

        get().fetchTodosPage(1)
    },

    searchTodos: (searchBy, searchTerm) => {
        set({
            searchBy: searchBy,
            searchTerm: searchTerm
        })

        get().fetchTodosPage(get().currentPage)
    },
}))

export default useTodoStore