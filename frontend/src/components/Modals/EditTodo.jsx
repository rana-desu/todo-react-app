import { useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'motion/react'
import ModalBackdrop from './ModalBackdrop'

const EditTodo = ({ todo, onEdit, onCancel }) => {
  const [title, setTitle] = useState(todo.title)
  const [description, setDescription] = useState(todo.description)
  const [remark, setRemark] = useState("")
  const [status, setStatus] = useState(todo.status)

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('sending request to axios..')
    await onEdit(todo.id, title, description, status, remark)
    
    onCancel()
  }

  const inputStyles = `p-5 my-2 min-w-2xl border-1 border-zinc-50/10 bg-opacity-[0.01] outline-none rounded-sm w-full`

  return (
    <>
      <ModalBackdrop />
      <motion.div 
        layoutId={`todo-${todo.id}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-transparent bg-opacity-1 flex justify-center items-center z-50"
      >
        <form
          onSubmit={handleSubmit}
          className="bg-black p-6 rounded-lg border-1 border-zinc-50/10 bg-opacity-[0.01] w-3xl"
        >
          <h2 className="text-3xl font-bold mb-4">Edit Todo</h2>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border-1 border-zinc-50/10 bg-opacity-[0.01] mb-4"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="rejected">Rejected</option>
            <option value="on-hold">On Hold</option>          
          </select>

          <input
            type="text"
            className={inputStyles}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className={inputStyles}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {
            status === 'rejected' && (
              <input 
                type="text"
                className={inputStyles}
                placeholder="If rejecting the todo, please leave a remark."
                onChange={(e) => setRemark(e.target.value)}
                required
              />
            )
          }

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="flex flex-row self-end item-center justify-center cursor-pointer px-4 py-3 my-5 border-1 border-zinc-50/10 min-w-50 font-medium rounded-sm text-white "
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex flex-row self-end item-center justify-center cursor-pointer px-4 py-3 my-5 border min-w-50 text-black font-medium rounded-sm btn-grad"
            >
              Save
            </button>
          </div>
        </form>
      </motion.div>
    </>
  )
}

export default EditTodo