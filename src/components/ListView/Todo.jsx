import { useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'motion/react'
import useTodoStore from '../../store/todoStore'

import TodoStatus from '../TodoStatus'
import TodoContent from './TodoContent'
import Categories from '../Categories'
import ActionDropdown from '../ActionDropdown'
import EditTodoModal from '../Modals/EditTodo'

const Todo = ({ todo }) => {
  const [isEditTodoModal, setIsEditTodoModal] = useState(false)
  const { deleteTodo, editTodo } = useTodoStore()

  return (
    <>
    <motion.li
      className="
        flex flex-col items-center justify-center 
        mb-4 w-full rounded-[6px]
        border border-zinc-50/10 bg-opacity-[0.01]
      "
      exit={{ opacity: 1 }}
      layoutId={`todo-${todo.id}`}
    >
      <div 
        className="flex flex-row items-center justify-between w-full">
        <TodoStatus status={todo.status} />
        <ActionDropdown
          id={todo.id}
          status={todo.status}
          onDelete={deleteTodo}
          onEdit={() => setIsEditTodoModal(true)}
        />
      </div>

      <div className="w-full flex flex-col items-center justify-center p-4">
        <TodoContent
          status={todo.status}
          title={todo.title} 
          description={todo.description}
          remark={todo.remark}
          creationDate={todo.creationDate}
        />
      </div>

      <div className="flex flex-row justify-between actions w-full border-t px-2 border-zinc-50/10">
        <Categories />
      </div>
    </motion.li>

    <AnimatePresence>
      {isEditTodoModal && (
        <EditTodoModal
          todo={todo}
          onEdit={editTodo}
          onCancel={() => setIsEditTodoModal(false)}
        />
      )}      
    </AnimatePresence>
    </>
  )
}

export default Todo