import { useState, useEffect } from 'react'

import TodoForm from './components/TodoForm'
import Todos from './components/Todos'
import todoService from './services/todos'

const App = () => {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')

  // render todos on initial startup
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

  const editTodo = (id, changedContent) => {
    const todo = findTodoById(id)
    const updatedTodo = { ...todo, content: changedContent }

    todoService.update(id, updatedTodo)
      .then(returnedTodo => {
        mapUpdatedTodo(id, returnedTodo)
      })
  }

  // value controllers / event handlers
  const handleTodoChange = (event) => setNewTodo(event.target.value)
  const handleDelete = (id) => {
    todoService.remove(id)
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== id))
      })
  }

  const handleToggleCheckbox = (id) => {
    const todo = findTodoById(id)
    const updatedTodo = { ...todo, checked: !todo.checked }

    todoService.update(todo.id, updatedTodo)
      .then(returnedTodo => {
        mapUpdatedTodo(id, returnedTodo)
      })
  }

  return (
    <div>
      <h1>TODO App</h1>
      <TodoForm 
        onSubmit={addTodo}
        onChange={handleTodoChange}
        value={newTodo}
      />

      <Todos 
        todos={todos}
        onSubmitEdit={editTodo}
        onClickDelete={handleDelete}
        onToggle={handleToggleCheckbox}
      />
    </div>
  )
}

export default App