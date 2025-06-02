import { useState, useEffect } from 'react'

import TodoForm from './components/TodoForm'
import Todos from './components/Todos'
import todoService from './services/todos'

const App = () => {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')

  useEffect(() => {
    todoService.render()
      .then(initialTodos => setTodos(initialTodos))
  }, [])
  console.log('rendered ' + todos.length + ' todos.');

  const addTodo = (event) => {
    event.preventDefault()

    const newTodoObject = {
      content: newTodo,
      checked: false
    }

    todoService.create(newTodoObject)
      .then(returnedTodo => {
        setTodos(todos.concat(returnedTodo))
        setNewTodo('')
      })
  }

  // helper functions
  const findTodoById = (id) => todos.find(t => t.id === id)
  const mapUpdatedTodo = (id, updatedTodo) => {
    setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo))
  }

  const editTodo = (id, editedContent) => {
    const todo = findTodoById(id)
    const updatedTodo = { ...todo, content: editedContent }

    todoService.update(id, updatedTodo)
      .then(returnedTodo => {
        mapUpdatedTodo(id, returnedTodo)
      })
  }

  const deleteTodo = (id) => {
    todoService.remove(id)
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== id))
      })
  }

  const handleTodoChange = (event) => setNewTodo(event.target.value)

  const handleCheckbox = (id) => {
    const todo = findTodoById(id)
    const updatedTodo = { ...todo, checked: !todo.checked }

    todoService.update(todo.id, updatedTodo)
      .then(returnedTodo => {
        mapUpdatedTodo(id, returnedTodo)
      })
  }

  return (
    <div class="todo-list">
      <h1 style={{textAlign: 'center'}}>TODO App</h1>
      <TodoForm 
        handleSubmit={addTodo}
        handleChange={handleTodoChange}
        value={newTodo}
        classes="add-form"
      />

      <Todos 
        todos={todos}
        handleSubmit={editTodo}
        handleDelete={deleteTodo}
        handleToggle={handleCheckbox}
      />
    </div>
  )
}

export default App