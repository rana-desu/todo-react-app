import { useState } from 'react'
import TodoForm from './TodoForm'

import DeleteIcon from '../assets/delete.svg'
import EmptyCheckBox from '../assets/empty_check_box.svg'
import FilledCheckBox from '../assets/filled_check_box.svg'

const Todo = ({ todo, onSubmitEdit, onClickDelete, onToggle }) => {
  const [currentEdit, setCurrentEdit] = useState(todo.content)
  const [editing, setEditing] = useState(false)

  const handleEditing = () => setEditing(true)
  const handleCurrentEditChange = (event) => {
    console.log('edited', event.target.value)
    setCurrentEdit(event.target.value)
  }

  return (
    <li className="todos">
      <button className="checkbox" onClick={() => onToggle(todo.id)}>
        <img src={
          todo.checked ? FilledCheckBox : EmptyCheckBox
        } alt="" />
      </button>
      <div className="todos-content" onClick={handleEditing}>
      {
        editing ? (
          <TodoForm 
            onSubmit={() => {
              onSubmitEdit(todo.id, currentEdit)
              setEditing(false)
            }}
            onChange={handleCurrentEditChange}
            value={currentEdit}
          />
        ) : (
          todo.content
        )
      }
      </div>
      <button 
        onClick={() => onClickDelete(todo.id)}
        className="delete-button"
      ><img src={DeleteIcon} alt="" /></button>
    </li>
  )
}

const Todos = ({ todos, onSubmitEdit, onClickDelete, onToggle }) => {
  return (
    <ul className="todos-container">
      {todos.map((todo) =>
        <Todo 
          key={todo.id} 
          todo={todo}
          onSubmitEdit={onSubmitEdit}
          onClickDelete={onClickDelete}
          onToggle={onToggle}
        />
      )}
    </ul>
  )
}

export default Todos