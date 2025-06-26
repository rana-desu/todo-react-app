import { useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'motion/react'

import useTodoStore from '../../store/todoStore'
import ModalBackdrop from './ModalBackdrop'
import CategoriesDropdown from '../CategoriesDropdown'
import AddIcon from '../../assets/add.svg?react'


const AddTodo = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [categories, setCategories] = useState([])
  const [isAdding, setIsAdding] = useState(false)

  const addTodo = useTodoStore((state) => state.addTodo)

  const handleCancel = () => setIsAdding(false)
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (title.trim() && description && categories) {
        await addTodo(title.trim(), description, categories)
        handleCancel()
        
        setTitle('')
        setDescription('')
        setCategories([])
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
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}      
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-opacity-1 flex flex-col justify-center items-center z-50 bg-black p-6 rounded-lg border-1 border-zinc-50/10 bg-opacity-[0.01] w-3xl"
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

          <div className="flex flex-row items-center justify-between min-w-2xl gap-4">
            <CategoriesDropdown 
              selectedCategories={categories}
              setSelectedCategories={setCategories}
            />
            
            <div className="flex gap-4">
              <button
                type="button"
                className="flex flex-row self-end item-center justify-center cursor-pointer px-4 py-3 my-5 border border-zinc-50/10 min-w-50 font-medium rounded-sm text-white bg-zinc-50/10"
                onClick={() => setIsAdding(false)}
              >
                cancel
              </button>    
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-row self-end item-center justify-center cursor-pointer px-4 py-3 my-5 border min-w-50 text-black font-medium rounded-md bg-amber-50"
                type="submit"
              >
                <AddIcon className="fill-black mr-2"/>
                <p>add todo!</p>
              </motion.button>
            </div>
          </div>
        </motion.form>
        </>
      )
    }
    </AnimatePresence>

    <div className="flex flex-row items-center justify-end min-w-2xl">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        className="flex flex-row self-end item-center justify-center cursor-pointer px-4 py-3 my-5 border min-w-50 text-black font-medium rounded-md bg-amber-50"
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
