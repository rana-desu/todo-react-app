import PendingIcon from '../assets/pending.svg?react'
import CompletedIcon from '../assets/completed.svg?react'
import InProgressIcon from '../assets/in-progress.svg?react'
import OnHoldIcon from '../assets/on-hold.svg?react'
import RejectedIcon from '../assets/rejected.svg?react'

const statusStyles = {
  pending: {
    icon: <PendingIcon className="fill-yellow-400 mr-2" />,
    className: 'border-yellow-500 text-yellow-300',
  },
  'in-progress': {
    icon: <InProgressIcon className="fill-blue-400 mr-2" />,
    className: 'border-blue-500 text-blue-300',
  },
  'on-hold': {
    icon: <OnHoldIcon className="fill-orange-400 mr-2" />,
    className: 'border-orange-500 text-orange-300',
  },
  completed: {
    icon: <CompletedIcon className="fill-green-400 mr-2" />,
    className: 'border-green-500 text-green-300',
  },
  rejected: {
    icon: <RejectedIcon className="fill-red-400 mr-2" />,
    className: 'border-red-500 text-red-300',
  },
}

const TodoStatus = ({ status }) => {
  const { icon, className } = statusStyles[status]

  return (
    <div className={`flex flex-row justify-center items-center self-start px-3 py-1 mx-3 my-2 border rounded-full ${className}`}>
      {icon}
      <p className="status text-center">
        {status}
      </p>
    </div>
  )
}

export default TodoStatus