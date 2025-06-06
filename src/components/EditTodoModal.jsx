import { useState } from 'react'

const EditTodoModal = ({ todo, onEdit, onCancel }) => {
  const [title, setTitle] = useState(todo.title)
  const [description, setDescription] = useState(todo.description)
  const [status, setStatus] = useState(todo.status)

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('sending request to axios..')
    await onEdit(todo.id, title, description, status)
    
    onCancel()
  }

  const inputStyles = `p-5 my-2 min-w-2xl border-1 border-gray-500 outline-none rounded-sm w-full`

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-1 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-black p-6 rounded-lg w-3xl"
      >
        <h2 className="text-3xl font-bold mb-4">Edit Todo</h2>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 border mb-4"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="rejected">Rejected</option>
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

        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditTodoModal