import { useRef } from 'react'
import Modal from '../modals/Modal'
import Button from '../Button'
import DeleteIcon from '@/assets/delete.svg?react'

const DeleteTodo = ({ onConfirm }) => {
  const deleteTodoRef = useRef()
  const toggleDeleteModal = () => deleteTodoRef.current.toggleOpened()

  const handleDeletion =() => {
    onConfirm()
    toggleDeleteModal()
  }

  return (
    <>
    <button onClick={toggleDeleteModal}>
      <DeleteIcon className="fill-zinc-50/60 hover:fill-zinc-50/80"/>  
    </button>

    <Modal layoutId="delete-todo" ref={deleteTodoRef}>
      <div className="flex flex-col justify-between w-full">
        <p className="flex items-center justify-center text-[18px] py-4 h-20">
          Are you sure you want to permanently delete this todo?</p>

        <div className="inline-flex items-center justify-center gap-8 h-20">
          <Button label="cancel" variant="cancel" type="button" onClick={toggleDeleteModal}/>
          <Button label="delete" variant="danger" onClick={handleDeletion}/>
        </div>
      </div>
    </Modal>
    </>
  )
}

export default DeleteTodo