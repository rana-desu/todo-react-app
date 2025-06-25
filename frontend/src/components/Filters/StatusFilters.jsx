// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'motion/react'
import useTodoStore from '@/store/todoStore'

const StatusFilters = () => {
  const statuses = [
    'all',
    'pending',
    'in-progress',
    'on-hold',
    'completed',
    'rejected',
  ]

  const { statusFilter, setFilter } = useTodoStore()
  const filterSelected = (status) => setFilter(status)

  console.log("current filter", statusFilter)

  return (
    <div className="flex items-center justify-end">
      {
        statuses.map((status) => (
          <label
            key={status}
            className={`relative ml-3 cursor-pointer transition rounded-full px-3 py-1 ${statusFilter === status ? '' : 'hover:bg-zinc-50/10'}`}
          >
            <input 
              type="radio" 
              name="todo-status"
              value={status}
              checked={status === statusFilter}
              onChange={(e) => filterSelected(e.target.value)}
              className="hidden"
            />
            <span className="cursor-pointer">
              {status}
            </span>
            
            {
              statusFilter === status && (
                <motion.span 
                  layoutId="statsues"
                  className="absolute inset-0 z-10 bg-white mix-blend-difference"
                  style={{ borderRadius: 9999 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )
            }
          </label>
        ))
      }
    </div>
  )
}

export default StatusFilters
