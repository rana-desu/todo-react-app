import PendingIcon from '@/assets/pending.svg?react'
import CompletedIcon from '@/assets/completed.svg?react'
import InProgressIcon from '@/assets/in-progress.svg?react'
import OnHoldIcon from '@/assets/on-hold.svg?react'
import RejectedIcon from '@/assets/rejected.svg?react'

const statusStyles = {
  pending: {
    icon: <PendingIcon className="fill-black w-5 h-5" />,
    className: 'bg-yellow-200',
  },
  'in-progress': {
    icon: <InProgressIcon className="fill-black w-5 h-5" />,
    className: 'bg-blue-200',
  },
  'on-hold': {
    icon: <OnHoldIcon className="fill-black w-5 h-5" />,
    className: ' bg-orange-200',
  },
  completed: {
    icon: <CompletedIcon className="fill-black w-5 h-5" />,
    className: 'bg-green-200',
  },
  rejected: {
    icon: <RejectedIcon className="fill-black w-5 h-5" />,
    className: 'bg-red-200',
  },
}

const TodoStatus = ({ status }) => {
  const { icon, className } = statusStyles[status]

  return (
    <div className={`inline-flex items-center min-w-[130px] gap-2 self-start px-3 py-1 mx-3 my-2 rounded-full ${className}`}>
      <span className="w-5 flex justify-center">
        {icon}
      </span>
      <p className="status text-center text-black font-medium">
        {status}
      </p>
    </div>
  )
}

export default TodoStatus