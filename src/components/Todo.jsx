import { useState } from 'react'
import useTodoStore from '../store/todoStore'

import TodoStatus from './TodoStatus'
import TodoContent from './TodoContent'
import Categories from './Categories'
import ActionButtons from './ActionButtons'
import EditModal from './EditModal'

const Todo = ({ todo }) => {
  const [isEditModal, setIsEditModal] = useState(false)
  const { deleteTodo, editTodo } = useTodoStore()

  return (
    <li className="
        flex flex-col items-center justify-center 
        mb-4 w-full 
        border border-gray-500 rounded-[6px]
      "
    >
      <div className="flex flex-row items-center justify-between w-full">
        <TodoStatus status="pending" />
        <ActionButtons 
          id={todo.id} 
          onDelete={deleteTodo}
          onEdit={() => setIsEditModal(true)}
        />
      </div>

      <div className="w-full flex flex-col items-center justify-center p-4">
        <TodoContent 
          title={todo.title}
          description={todo.description}
        />
      </div>

      <div className="flex flex-row justify-between actions w-full border-t px-2 border-gray-500">
        <Categories />
      </div>

      {
        isEditModal && (
          <EditModal 
            todo={todo}
            onEdit={editTodo}
            onCancel={() => setIsEditModal(false)}
          />
        )
      }
    </li>
  )
}

export default Todo