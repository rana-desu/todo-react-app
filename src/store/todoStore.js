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
    totalPages: 0, // total pages is calculated based upon current todos
    filter: {
        status: "all", // default status set to all
        id: 1
    },

    fetchTodosPage: async (page) => {
        const { pageCache, pageSize, filter } = get()
        const status = filter.status

        if (pageCache[status]?.[page]) {
            set({ 
                todos: pageCache[status][page], 
                currentPage: page
             })
            return
        }

        const returnedPage = await todoService.getPage(page, pageSize, status)
        const { data, ...info } = returnedPage
        console.log(page, returnedPage)

        set((state) => ({
            todos: data,
            totalPages: info.pages,
            currentPage: page,
            pageCache: {
                ...state.pageCache,
                [status]: {
                    ...(state.pageCache[status] || {}),
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

    // fetchTodos: async () => {
    //     const fetchedTodos = await todoService.getAll()
    //     console.log('fetching notes...', fetchedTodos)

    //     set(({ todos }) => ({
    //         todos: fetchedTodos,
    //         totalPages: Math.ceil(todos.length / get().pageSize)
    //     }))
    // },

    setFilter: async (status) => {
        const { pageSize } = get()

        const returnedFilter = await todoService.setFilter(status)
        const firstPage = await todoService.getPage(1, pageSize, status)

        set({
            filter: returnedFilter,
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
}))

export default useTodoStore