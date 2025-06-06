import PendingIcon from '../assets/pending.svg?react'

const TodoStatus = ({ status }) => {
  return (
    <div className="flex flex-row justify-center items-center self-start px-3 py-1 mx-3 my-2 border border-yellow-500 text-amber-300 rounded-full">
      <PendingIcon className="fill-amber-400 mr-2" />
      <p className="status text-center">
        {status}
      </p>
    </div>
  )
}

export default TodoStatus