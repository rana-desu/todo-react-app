import { useState } from 'react'

import TodoForm from './TodoForm'

import DeleteIcon from '../assets/delete.svg'
import EmptyCheckBox from '../assets/empty_check_box.svg'
import FilledCheckBox from '../assets/filled_check_box.svg'

const Todo = ({ todo, handleSubmit, handleDelete, handleToggle }) => {
  const [editingId, setEditingId] = useState(null)
  const [editedContent, setEditedContent] = useState(todo.content)

  const handleEditChange = (event) => setEditedContent(event.target.value)
  const startEditing = (id) => setEditingId(id)

  return (
    <li className="todos">
      <button className="checkbox" onClick={() => handleToggle(todo.id)}>
        <img src={
          todo.checked ? FilledCheckBox : EmptyCheckBox
        } alt="" />
      </button>
      <div 
        className={
          todo.checked 
            ? 'strikethrough todos-content' 
            : 'todos-content'
        } 
        onClick={() => startEditing(todo.id)}>
      {
        editingId ? (
          <TodoForm
            todoId={todo.id} 
            editedContent={editedContent}
            onSubmit={() => {
              handleSubmit(todo.id, editedContent)
              setEditingId(null)
            }}
            onChange={handleEditChange}
            value={editedContent}
          />
        ) : (
          todo.content
        )
      }
      </div>
      <button 
        onClick={() => handleDelete(todo.id)}
        className="delete-button"
      ><img src={DeleteIcon} alt="" /></button>
    </li>
  )
}

const Todos = ({ todos, handleSubmit, handleDelete, handleToggle }) => {
  return (
    <ul className="todos-container">
      {todos.map((todo) =>
        <Todo 
          key={todo.id} 
          todo={todo}
          handleSubmit={handleSubmit}
          handleDelete={handleDelete}
          handleToggle={handleToggle}
        />
      )}
    </ul>
  )
}

export default Todos