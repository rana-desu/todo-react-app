import { useState, useEffect, useRef } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'motion/react'

import useTodoStore from '@/store/todoStore'
import SortIcon from '@/assets/sort.svg?react'


const actionDropdownVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 20 }
  },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
}


const SortingFilters = ({ onOldest, onLatest }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
        // should be not null,
        // and should not contain event.target DOM element
      }
    }
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // const { setFilter } = useTodoStore()

  // const handleLatest = () => {
  //   setFilter(
  //     useTodoStore.getState().filter.status,
  //     'createdAt',
  //     'desc'
  //   )
  // }
  // const handleOldest = () => {
  //   setFilter(
  //     useTodoStore.getState().filter.status,
  //     'createdAt',
  //     'asc'
  //   )
  // }

  const { sortOrder } = useTodoStore()
  console.log('sort order changed to:', sortOrder)

  return (
    <div ref={dropdownRef} className="flex flex-row justify-center items-center mr-3 my-2 relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onHoverStart={() => console.log('hover started!')}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="px-4 py-2 border border-zinc-50/10 bg-opacity-[0.01] rounded text-shadow-md text-white cursor-pointer"
      >
        <SortIcon />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={actionDropdownVariants}
            className="absolute top-full mt-2 w-40 shadow-lg"
          >
            <div className="bg-black text-white text-sm rounded-[6px] border border-zinc-50/10 bg-opacity-[0.01] p-1">
              <button
                type="button"
                onClick={onOldest}
                className={`flex flex-row item-center justify-start cursor-pointer transition duration-300 ease-in-out w-full px-4 py-2 hover:bg-white hover:text-black rounded ${sortOrder === 'asc' ? 'bg-white text-black' : ''}`}
              >
                Oldest
              </button>
              
              <button
                type="button"
                onClick={onLatest}
                className={`flex flex-row item-center justify-start cursor-pointer transition duration-300 ease-in-out w-full px-4 py-2 hover:bg-white hover:text-black rounded ${sortOrder === 'desc' ? 'bg-white text-black' : ''}`}
              >
                Latest
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SortingFilters