import { create } from 'zustand'
import todoService from '../services/todos'

const findTodoById = (todos, id) => (
    todos.find(todo => todo.id === id)
)
const mapUpdatedTodo = (todos, id, updatedTodo) => (
    todos.map(todo => todo.id === id ? updatedTodo : todo)
)

const useTodoStore = create((set, get) => ({
    todos: [],
    filter: {
        status: "all", // default status set to all
        id: 1
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

    fetchTodos: async () => {
        const fetchedTodos = await todoService.getAll()
        console.log('fetching notes...', fetchedTodos)

        set(() => ({
            todos: fetchedTodos
        }))
    },

    setFilter: async (status) => {
        const returnedFilter = await todoService.setFilter(status)
        console.log('returned status upon filter change:', returnedFilter);
        
        set({ filter: returnedFilter })
    },

    filteredTodos: () => {
        const { todos, filter } = get()

        if (filter.status === 'all') {
            console.log('all todos:', todos);
            
            return [...todos].reverse()
        }
        
        return [...todos.filter(todo => todo.status === filter.status)].reverse()
    }
}))

export default useTodoStore