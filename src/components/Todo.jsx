import { useState } from 'react'
import useTodoStore from '../store/todoStore'

import TodoStatus from './TodoStatus'
import TodoContent from './TodoContent'
import Categories from './Categories'
import ActionButtons from './ActionButtons'
import EditTodoModal from './EditTodoModal'

const Todo = ({ todo }) => {
  const [isEditTodoModal, setIsEditTodoModal] = useState(false)
  const { deleteTodo, editTodo } = useTodoStore()

  console.log(todo)

  return (
    <li className="
        flex flex-col items-center justify-center 
        mb-4 w-full 
        border border-gray-500 rounded-[6px]
      "
    >
      <div className="flex flex-row items-center justify-between w-full">
        <TodoStatus status={todo.status} />
        <ActionButtons 
          id={todo.id} 
          onDelete={deleteTodo}
          onEdit={() => setIsEditTodoModal(true)}
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
        isEditTodoModal && (
          <EditTodoModal 
            todo={todo}
            onEdit={editTodo}
            onCancel={() => setIsEditTodoModal(false)}
          />
        )
      }
    </li>
  )
}

export default Todo