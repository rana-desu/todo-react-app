import DeleteIcon from '../assets/delete.svg?react'
import EditIcon from '../assets/edit.svg?react'

const ActionButtons = ({ id, onDelete, onEdit }) => {
  return (
    <div className="action-buttons flex flex-row justify-center items-center mx-3 my-2">
      <button
        type="button"
        onClick={onEdit} 
        className="flex flex-row item-center justify-center border border-transparent cursor-pointer rounded-full ml-3 hover:bg-blue-500 p-0.5 transition duration-300 ease-in-out"
      >
        <EditIcon className="fill-white hover:fill-white"/>
      </button>
      <button
        type="button" 
        onClick={async () => await onDelete(id)}
        className="flex flex-row item-center justify-center border border-transparent cursor-pointer rounded-full ml-3 bg-red-700 hover:bg-red-500 p-0.5 transition duration-300 ease-in-out"
      >
        <DeleteIcon className="fill-black hover:fill-white"/>
      </button>
    </div>
  )
}

export default ActionButtons