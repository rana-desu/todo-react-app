import { useState, useRef, useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'motion/react'
import { useTodoStore } from '@/store'
import { useDebounce } from '@uidotdev/usehooks'


const actionDropdownVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 20 }
  },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
}


const TodoSearch = () => {
  const [searchBy, setSearchBy] = useState('title')
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const { searchTerm, setSearchTerm } = useTodoStore()
  const debuoncedSearchTerm = useDebounce(searchTerm, 800)

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  
  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }

  useEffect(() => {
    if (debuoncedSearchTerm != '') {
      useTodoStore.getState().searchTodos(searchBy, debuoncedSearchTerm)
    } else if (debuoncedSearchTerm === '') {
      useTodoStore.getState().refetchPage()
    }
  }, [searchBy, debuoncedSearchTerm])

  return (
    <div className="flex items-center">
      <div ref={dropdownRef} className="flex flex-row justify-center items-center mr-3 my-2 relative">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onHoverStart={() => console.log('hover started!')}
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="px-4 py-2 border border-zinc-50/10 bg-opacity-[0.01] rounded text-shadow-md text-zinc-50/50 cursor-pointer"
        >
          {`by: ${searchBy}`}
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
                <button
                  type="button"
                  onClick={() => setSearchBy('title')}
                  className={`flex flex-row item-center justify-start cursor-pointer transition duration-300 ease-in-out w-full px-4 py-2 my-1 hover:bg-white hover:text-black rounded ${searchBy === 'title' ? 'bg-white text-black' : ''}`}
                >
                  title
                </button>
                
                <button
                  type="button"
                  onClick={() => setSearchBy('description')}
                  className={`flex flex-row item-center justify-start cursor-pointer transition duration-300 ease-in-out w-full px-4 py-2 my-1 hover:bg-white hover:text-black rounded ${searchBy === 'description' ? 'bg-white text-black' : ''}`}
                >
                  description
                </button>

                <button
                  type="button"
                  onClick={() => setSearchBy('remark')}
                  className={`flex flex-row item-center justify-start cursor-pointer transition duration-300 ease-in-out w-full px-4 py-2 my-1 hover:bg-white hover:text-black rounded ${searchBy === 'remark' ? 'bg-white text-black' : ''}`}
                >
                  remark
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <input 
        type="text"
        placeholder="Search from title, description, and remarks"
        value={searchTerm}
        onChange={handleChange}
        className="px-3 py-2 my w-md border-1 border-zinc-50/10 bg-opacity-[0.01] outline-none rounded-sm" 
      />
    </div>
  )
}

export default TodoSearch