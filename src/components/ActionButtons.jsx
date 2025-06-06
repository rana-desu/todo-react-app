import DeleteIcon from '../assets/delete.svg?react'
import EditIcon from '../assets/edit.svg?react'

const ActionButtons = ({ id, onDelete, onEdit }) => {
  return (
    <div className="action-buttons flex flex-row justify-center items-center">
      <button
        type="button"
        onClick={onEdit} 
        className="flex flex-row item-center justify-center rounded-full m-2 bg-blue-700 hover:bg-blue-500"
      >
        <EditIcon className="fill-black hover:fill-white"/>
      </button>
      <button
        type="button" 
        onClick={async () => await onDelete(id)}
        className="flex flex-row item-center justify-center rounded-full m-2 bg-red-700 hover:bg-red-500"
      >
        <DeleteIcon className="fill-black hover:fill-white"/>
      </button>
    </div>
  )
}

export default ActionButtons