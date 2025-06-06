import { create } from 'zustand'
import todoService from '../services/todos'

const findTodoById = (todos, id) => (
    todos.find(todo => todo.id === id)
)
const mapUpdatedTodo = (todos, id, updatedTodo) => (
    todos.map(todo => todo.id === id ? updatedTodo : todo)
)

const useTodoStore = create((set) => ({
    todos: [],

    addTodo: async (title, description) => {
        try {
            const newTodo = {
                title,
                description,
            }
            console.log('before axios call');
            const returnedTodo = await todoService.create(newTodo)
            console.log('after axios call');
    
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

    editTodo: async (id, newTitle, newDescription) => {
        const returnedTodo = await todoService.update(id, {
            title: newTitle,
            description: newDescription
        })
        set(({ todos }) => {
            console.log('changed todos...', mapUpdatedTodo(todos, id, returnedTodo))
            return { todos: mapUpdatedTodo(todos, id, returnedTodo) }
        })
    },

    fetchTodos: async () => {
        const fetchedTodos = await todoService.getAll()
        console.log('fetching notes...', fetchedTodos)

        set(() => ({
            todos: fetchedTodos
        }))
    }
}))

export default useTodoStore