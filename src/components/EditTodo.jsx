import { useState, useCallback } from 'react'
import useTodoStore from '../store/todoStore'

const EditTodo = ({ todo }) => {
  console.log(todo.title, todo.description);
  
  const [edits, setEdits] = useState({
    title: todo.title,
    description: todo.descrption
  })
  const editTodo = useTodoStore(useCallback((state) => state.editTodo, []))

  const handleChange = (e) => {
    const { name, value } = e.target
    setEdits(prev => ({ ...prev, [name]: value }))
  }

  const handleEdit = (e) => {
    e.preventDefault() 
    editTodo(todo.id, edits.title, edits.description)
  }

  return (
    <form action="" onSubmit={handleEdit} >
      <input
        type="text"
        name="title"
        className="todo-title-input"
        onChange={handleChange}
      />

      <input 
        type="text"
        name="description"
        className="todo-desc-input"
        onChange={handleChange}
      />

      <button className="add-button">edit</button>
    </form>
  )
}

export default EditTodo