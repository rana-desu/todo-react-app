import { create } from 'zustand'
import todoService from '../services/todos'

const mapUpdatedTodo = (todos, id, updatedTodo) => (
    todos.map(todo => todo.id === id ? updatedTodo : todo)
)

const useTodoStore = create((set, get) => ({
    currentPage: 1,
    pageSize: 5,
    totalPages: 0,
    totalTodos: 0,

    cachedPages: [], // [page_num: {[data], totalPages, totalTodos}, ...]

    todos: [],
    currentSerials: [],

    statusFilter: 'all',
    categoryFilter: [],
    sortOrder: 'asc',
    searchBy: 'title',
    searchTerm: '',

    fetchTodosPage: async (page) => {
        const {
            searchBy, 
            searchTerm, 
            statusFilter, 
            categoryFilter, 
            pageSize, 
            sortOrder,
            cachedPages,
        } = get()

        console.log('length of cachedPages: ', cachedPages?.length)
        if (page in cachedPages) {
            console.log('requested page already exists in cache...', cachedPages)
            set(() => ({
                todos: cachedPages[page].data,
                totalTodos: cachedPages[page].totalTodos,
                totalPages: cachedPages[page].totalPages,
                currentPage: page,
            }))
        } else {
            const returnedPage = await todoService.getPage(
                searchBy, 
                searchTerm, 
                statusFilter, 
                categoryFilter, 
                page, 
                pageSize, 
                sortOrder,
            )

            const { data, ...info } = returnedPage

            cachedPages[page] = {
                data, 
                totalTodos: info.totalTodos, 
                totalPages: Math.ceil(info.totalTodos / pageSize)
            }
            console.log('requested page was cached in memory: ', cachedPages)

            set(() => ({
                todos: data,
                totalPages: info.totalPages,
                totalTodos: info.totalTodos,
                currentPage: page,
            }))
        }

        let newSerials = []
        for (let i = 0; i < get().totalTodos; i++) {
            newSerials[i] = i + 1
        }
        set(() => ({ currentSerials: newSerials }))
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
            return { todos: mapUpdatedTodo(todos, id, returnedTodo) }
        })

        get().fetchTodosPage(get().currentPage)
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

    filterByCategory: (category) => {
        set(({categoryFilter}) => {
            if (!categoryFilter.includes(category)) {
                return {
                    categoryFilter: [...categoryFilter, category]
                }
            }

            return {
                categoryFilter: categoryFilter.filter(c => c !== category)
            }
        })

        get().fetchTodosPage(get().currentPage)
    },

    serialize: () => {
        set(() => {
            let newSerials = []

            for (let i = 0; i < get().totalTodos; i++) {
                newSerials[i] = i + 1
            }
            
            return (
                { currentSerials: newSerials }
            )
        })
    },
}))

export default useTodoStore