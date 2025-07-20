// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react'

import EditTodo from '../modals/EditTodo'
import ViewTodo from '../modals/ViewTodo'

import DeleteIcon from '@/assets/delete.svg?react'


const ActionButtons = ({ todo, onDelete }) => {
  return (
    <div className="flex items-center justify-center gap-4">
      <ViewTodo todo={todo}/>

      <EditTodo todo={todo}/>

      <button onClick={onDelete}>
        <DeleteIcon 
          className="fill-zinc-50/60 hover:fill-zinc-50/80"
        />
      </button>

    </div>
  )
}

export default ActionButtons