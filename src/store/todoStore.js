import { create } from 'zustand'
import todoService from '../services/todos'

const findTodoById = (todos, id) => (
    todos.find(todo => todo.id === id)
)
const mapUpdatedTodo = (todos, id, updatedTodo) => (
    todos.map(todo => todo.id === id ? updatedTodo : todo)
)

const useTodoStore = create((set, get) => ({
    pageCache: {}, // structure: { [status]: { [page]: data } }
    currentPage: 1,
    pageSize: 20,

    todos: [],
    allTodos: [],
    totalPages: 0,
    filter: {
        status: "all",
        sortBy: "createdAt",
        sortOrder: "desc",
        id: 1,
    },
    sortOrder: 'asc',
    searchTerm: '',

    fetchTodosPage: async (page) => {
        const { pageCache, pageSize, filter } = get()

        if (pageCache[filter.status]?.[page]) {
            set({ 
                todos: pageCache[filter.status][page], 
                currentPage: page
             })
            return
        }

        const returnedPage = await todoService.getPage(
            page, 
            pageSize, 
            filter.status,
            filter.sortBy,
            filter.sortOrder
        )

        const { data, ...info } = returnedPage
        console.log(page, returnedPage)

        console.log('info from returnedPage', info)

        set((state) => ({
            todos: data,
            allTodos: data,
            totalPages: info.pages,
            currentPage: page,
            pageCache: {
                ...state.pageCache,
                [filter.status]: {
                    ...(state.pageCache[filter.status] || {}),
                    [page]: data,
                }
            }
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
                order: get().todos.length,
            }
            const returnedTodo = await todoService.create(newTodo)

            set(({ todos }) => {
                console.log('new todo to be added: ', returnedTodo)
                return { todos: [...todos, returnedTodo] }
            })
        } catch (error) {
            console.error(`Couldn't add todo:`, error)
        }
    },

    deleteTodo: async (id) => {
        try {
            await todoService.remove(id)
    
            set(({ todos }) => {
                console.log("todo to be deleted", findTodoById(todos, id))
                const changedTodos = todos.filter(todo => todo.id !== id )
                return { todos: changedTodos }
            })
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

    setFilter: async (status, sortBy = 'createdAt', sortOrder = 'desc') => {
        const { pageSize } = get()

        const returnedFilter = await todoService.setFilter(status)
        const firstPage = await todoService.getPage(1, pageSize, status, sortBy, sortOrder)

        set({
            filter: {
                ...returnedFilter,
                sortBy,
                sortOrder,
            },
            todos: firstPage.data,
            totalPages: firstPage.pages,
            currentPage: 1,
            pageCache: {
                [status]: {
                    1: firstPage.data
                }
            }
        })
    },

    sortTodos: (sortOrder) => {
        const { todos } = get()
        console.log('todos to sort in sortedTodos:', todos)

        const sorted = [...todos].sort((a, b) => {
            const dateA = new Date(a.createdAt)
            const dateB = new Date(b.createdAt)

            return (sortOrder === 'asc')
                ? dateA - dateB
                : dateB - dateA
        })

        set({ 
            todos: sorted,
            sortOrder: sortOrder
        })
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