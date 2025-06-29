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


const SortingFilters = ({ onOldest, onLatest, onFilterByCategory }) => {
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

  const { sortOrder, categoryFilter } = useTodoStore()
  console.log('sort order changed to:', sortOrder)

  return (
    <div ref={dropdownRef} className="flex flex-row justify-center items-center mr-3 my-2 relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onHoverStart={() => console.log('hover started!')}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="px-4 py-2 border border-zinc-50/10 bg-opacity-[0.01] rounded text-shadow-md text-zinc-50/50 cursor-pointer"
      >
        <SortIcon className="fill-zinc-50/50"/>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={actionDropdownVariants}
            className="absolute top-full w-40 shadow-lg"
          >
            <div className="bg-black text-white text-sm rounded-[6px] border border-zinc-50/10 bg-opacity-[0.01] px-1">
              <span className="flex border border-zinc-50/10 px-2 py-1 mt-1 text-zinc-50/50">
                sort by date
              </span>
              <button
                type="button"
                onClick={onOldest}
                className={`flex flex-row item-center justify-start cursor-pointer transition duration-300 ease-in-out w-full px-4 py-2 my-1 hover:bg-white rounded hover:text-black ${sortOrder === 'asc' ? 'text-white' : 'text-zinc-50/50'}`}
              >
                Oldest First
              </button>
              
              <button
                type="button"
                onClick={onLatest}
                className={`flex flex-row item-center justify-start cursor-pointer transition duration-300 ease-in-out w-full px-4 py-2 my-1 hover:bg-white rounded hover:text-black ${sortOrder === 'desc' ? 'text-white' : 'text-zinc-50/50'}`}
              >
                Latest First
              </button>

              <span className="flex border border-zinc-50/10 px-2 py-1 text-zinc-50/50">
                filter by categories
              </span>

              <button
                type="button"
                onClick={() => onFilterByCategory('work')}
                className={`flex flex-row item-center justify-start cursor-pointer transition duration-300 ease-in-out w-full px-4 py-2 my-1 hover:bg-white hover:text-black rounded ${categoryFilter.includes('work') ? 'border-l' : ''}`}
              >
                Work
              </button>

              <button
                type="button"
                onClick={() => onFilterByCategory('personal')}
                className={`flex flex-row item-center justify-start cursor-pointer transition duration-300 ease-in-out w-full px-4 py-2 my-1 hover:bg-white hover:text-black rounded ${categoryFilter.includes('personal') ? 'border-l' : ''}`}
              >
                Personal
              </button>

              <button
                type="button"
                onClick={() => onFilterByCategory('chores')}
                className={`flex flex-row item-center justify-start cursor-pointer transition duration-300 ease-in-out w-full px-4 py-2 my-1 hover:bg-white hover:text-black rounded ${categoryFilter.includes('chores') ? 'border-l' : ''}`}
              >
                Chores
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SortingFilters