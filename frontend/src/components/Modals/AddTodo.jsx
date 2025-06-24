import { useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'motion/react'

import useTodoStore from '../../store/todoStore'
import ModalBackdrop from './ModalBackdrop'
import AddIcon from '../../assets/add.svg?react'

const dropIn = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 20 }
  },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
}

const AddTodo = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isAdding, setIsAdding] = useState(false)

  const addTodo = useTodoStore((state) => state.addTodo)

  const handleCancel = () => setIsAdding(false)
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (title.trim() && description) {
        await addTodo(title.trim(), description)
        handleCancel()
        setTitle('')
        setDescription('')
      } else {
        alert('please enter non-empty inputs.')
      }
    } catch (error) {
      console.error('error while handling AddTodo submission:', error)
    }
  }

  const inputStyles = `p-5 my-2 min-w-2xl border-1 border-zinc-50/10 bg-opacity-[0.01] outline-none rounded-sm w-full`

  return (
    <>
    <AnimatePresence>
    {
      isAdding && (
        <>
        <ModalBackdrop />
        <motion.form
          key="add-todo-form"
          onSubmit={handleSubmit} 
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex flex-col items-center justify-center z-50 p-8 w-full border border-zinc-50/10 bg-opacity-[0.01] rounded-[6px]"
        > 
          <div className="flex flex-col items-center">
            <input
              type="text"
              name="title"
              className={inputStyles}
              value={title}
              placeholder="Enter TODO's title"
              onChange={e => {
                setTitle(e.target.value)
                console.log(title);
              }}
              required
            />

            <textarea 
              type="text"
              name="description"
              className={inputStyles}
              value={description}
              placeholder="Enter TODO's description"
              onChange={e => {
                setDescription(e.target.value)
                console.log(description)
              }}
            />
          </div>

          <div className="flex flex-row items-center justify-end min-w-2xl">
            <button
              type="button"
              className="flex flex-row self-end item-center justify-center cursor-pointer px-4 py-3 my-5 border-1 border-zinc-50/10 min-w-50 font-medium rounded-sm text-white "
              onClick={() => setIsAdding(false)}
            >
              Cancel
            </button>    
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.85 }}
              className="flex flex-row self-end item-center justify-center cursor-pointer px-4 py-3 my-5 border min-w-50 text-black font-medium rounded-sm btn-grad"
              type="submit"
            >
              <AddIcon className="fill-black mr-2"/>
              <p>add todo!</p>
            </motion.button>
          </div>
        </motion.form>
        </>
      )
    }
    </AnimatePresence>

    <div className="flex flex-row items-center justify-end min-w-2xl">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.85 }}
        className="flex flex-row self-end item-center justify-center cursor-pointer px-4 py-3 my-5 border min-w-50 text-black font-medium rounded-sm btn-grad"
        onClick={() => setIsAdding(true)}
        type="button"
      >
        <AddIcon className="fill-black mr-2"/>
        <p>add todo!</p>
      </motion.button>
    </div>
    </>
  )
}

export default AddTodo
