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
    statusStats: null,

    todos: [],
    currentSerials: [],

    statusFilter: 'all',
    categoryFilter: [],
    sortOrder: 'desc',
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

            const { data, totalTodos } = returnedPage
            const totalPages = Math.ceil(totalTodos / pageSize)

            cachedPages[page] = {
                data, 
                totalTodos, 
                totalPages
            }
            console.log('requested page was cached in memory: ', cachedPages)

            set(() => ({
                todos: data,
                totalPages,
                totalTodos,
                currentPage: page,
            }))
        }

        let newSerials = []
        for (let i = 0; i < get().totalTodos; i++) {
            newSerials[i] = i + 1
        }
        set(() => ({ currentSerials: newSerials }))
    },

    refetchPage: (page = get().currentPage) => {
        const { cachedPages, fetchTodosPage } = get()

        delete cachedPages[page]
        fetchTodosPage(page)
    },

    addTodo: async (title, description, categories) => {
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
        get().refetchPage()
    },

    deleteTodo: async (id) => {
        try {
            await todoService.remove(id)
            get().refetchPage()
        } catch (error) {
            console.error(`Couldn't delete todo:`, error)
        }
    },

    editTodo: async (id, title, description, status, categories, remark) => {
        const returnedTodo = await todoService.update(id, {
            title,
            description,
            status,
            categories,
            remark,
        })

        set(({ todos }) => ({ todos: mapUpdatedTodo(todos, id, returnedTodo) }))
        get().refetchPage()
    },

    updateStatus: async (id, newStatus) => {
        const returnedTodo = await todoService.update(id, {
            status: newStatus
        })
        set (({ todos }) => ({
            todos: mapUpdatedTodo(todos, id, returnedTodo)
        }))
    },

    setFilter: (status) => {
        set({ statusFilter: status })
        get().refetchPage(1)
    },

    sortTodos: async (sortOrder) => {
        set({ sortOrder: sortOrder })
        get().refetchPage(1)
    },

    setSearchTerm: (searchTerm) => { set({ searchTerm }) },

    searchTodos: (searchBy, searchTerm) => {
        set({
            searchBy: searchBy,
            searchTerm: searchTerm
        })
        get().refetchPage()
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
        get().refetchPage()
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

    getStatusStats: async () => {
        const stats = await todoService.getStats()

        set({ statusStats: stats })
        get().refetchPage()
    },
}))

export default useTodoStore