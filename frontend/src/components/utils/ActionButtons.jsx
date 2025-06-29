// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react'

import DeleteIcon from '@/assets/delete.svg?react'
import EditIcon from '@/assets/edit.svg?react'
import ViewIcon from '@/assets/view.svg?react'

const ActionButtons = ({ onView, onEdit, onDelete }) => {
  return (
    <div className="flex items-center justify-center">
      <motion.button
        whileHover={{
          scale: 1.2,
          transition: { duration: 1 },
        }}
        whileTap={{ scale: 0.9 }}
        onClick={onView}
        className="mx-2"
      >
        <ViewIcon 
          className="fill-zinc-50/60 hover:fill-zinc-50/80"
        />
      </motion.button>

      <motion.button
        whileHover={{
          scale: 1.2,
          transition: { duration: 1 },
        }}
        whileTap={{ scale: 0.9 }}
        onClick={onEdit}
        className="mx-2"
      >
        <EditIcon 
          className="fill-zinc-50/60 hover:fill-zinc-50/80"
        />
      </motion.button>

      <motion.button
        whileHover={{
          scale: 1.2,
          transition: { duration: 1 },
        }}
        whileTap={{ scale: 0.9 }}
        onClick={onDelete}
        className="mx-2"
      >
        <DeleteIcon 
          className="fill-zinc-50/60 hover:fill-zinc-50/80"
        />
      </motion.button>

    </div>
  )
}

export default ActionButtons