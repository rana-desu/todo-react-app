// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react'

import TodoContent from '../TodoContent'
import TodoStatus from '../TodoStatus'
import Categories from '../Categories'
import ModalBackdrop from './ModalBackdrop'
import CloseIcon from '@/assets/delete.svg?react'

const ViewTodo = ({ todo, onClose }) => {
  return (
    <>
    <ModalBackdrop />
    <motion.div 
      layoutId={`todo-${todo.id}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}      
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-opacity-1 flex flex-col justify-center items-center z-50 bg-black p-6 rounded-lg border-1 border-zinc-50/10 bg-opacity-[0.01] w-3xl"
    >
      <div 
        className="flex flex-row items-center justify-between w-full">
        <TodoStatus status={todo.status} />

        <button
          className="cursor-pointer mr-2" 
          onClick={onClose}
        >
          <CloseIcon />
        </button>
      </div>

      <div className="w-full flex flex-col items-center justify-center p-4">
        <TodoContent
          status={todo.status}
          title={todo.title} 
          description={todo.description}
          remark={todo.remark}
          creationDate={todo.createdAt}
        />
      </div>

      <div className="flex flex-row justify-between actions w-full border-t px-2 border-zinc-50/10">
        <Categories />
      </div>
    </motion.div>
    </>
  )
}

export default ViewTodo