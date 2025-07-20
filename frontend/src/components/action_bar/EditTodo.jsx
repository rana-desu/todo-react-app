import { useState, useRef } from 'react'
import useTodoStore from '@/store/todoStore'
import Modal from '../modals/Modal'
import Button from '../Button'
import EditIcon from '@/assets/edit.svg?react'

const EditTodo = ({ todo }) => {
  const { editTodo } = useTodoStore()

  const [title, setTitle] = useState(todo.title)
  const [description, setDescription] = useState(todo.description)
  const [remark, setRemark] = useState(todo.remark)
  const [status, setStatus] = useState(todo.status)
  const editFormRef = useRef()

  const toggleEditModal = () => editFormRef.current.toggleOpened()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await editTodo(todo.id, title, description, status, remark)
    
    toggleEditModal()
  }

  return (
    <>
    <button onClick={toggleEditModal}>
      <EditIcon className="fill-zinc-50/60 hover:fill-zinc-50/80"/>
    </button>

    <Modal layoutId={`todo-${todo.id}`} buttonLabel="edit" ref={editFormRef}>
      <form
        onSubmit={handleSubmit}
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
          className="p-5 my-2 min-w-2xl border-1 border-zinc-50/10 bg-opacity-[0.01] outline-none rounded-sm w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="p-5 my-2 min-w-2xl border-1 border-zinc-50/10 bg-opacity-[0.01] outline-none rounded-sm w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {
          status === 'rejected' && (
            <input 
              type="text"
              className="p-5 my-2 min-w-2xl border-1 border-zinc-50/10 bg-opacity-[0.01] outline-none rounded-sm w-full"
              placeholder="If rejecting the todo, please leave a remark."
              onChange={(e) => setRemark(e.target.value)}
              value={remark}
              required
            />
          )
        }

        <div className="flex justify-end gap-8">
          <Button
            type="button"
            onClick={toggleEditModal}
            variant="cancel"
            label="cancel"
          />
          <Button
            type="submit"
            variant="submit"
            label="save"
          />
        </div>
      </form>
    </Modal>
    </>
  )
}

export default EditTodo