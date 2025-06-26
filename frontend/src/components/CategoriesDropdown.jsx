import { useState, useRef, useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'motion/react'

const categoriesList = ['work', 'personal', 'chores']

const actionDropdownVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 20 }
  },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
}

const CategoriesDropdown = ({ selectedCategories, setSelectedCategories }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const toggleDropdown = () => setIsOpen(!isOpen)

  const handleCheckboxChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category) // deselect the category
        : [...prev, category]
    )
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={dropdownRef} className="action-buttons flex flex-row justify-center items-center mx-3 my-2 relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onHoverStart={() => console.log('hover started!')}
        type="button"
        onClick={toggleDropdown}
        className="flex justify-self-start px-4 py-2 border border-zinc-50/10 bg-opacity-[0.01] rounded text-shadow-md text-white cursor-pointer min-w-[220px]"
      >
        {
          selectedCategories.length > 0
            ? selectedCategories.join(', ')
            : 'Select Categories'
        }
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={actionDropdownVariants}
            className="absolute top-full mt-2 w-40 rounded shadow-lg z-20 bg-zinc-800/50"
          >
            {categoriesList.map(category => (
              <label
                key={category}
                className={`flex flex-row item-center justify-start cursor-pointer transition duration-300 ease-in-out w-full px-4 py-2 my-1 hover:bg-white hover:text-black rounded ${selectedCategories.includes(category) ? 'bg-white text-black' : ''}`}
              >
                <input 
                  type="checkbox" 
                  value={category}
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCheckboxChange(category)}
                  className={`mr-2 hidden`}
                  required
                />
                {category}
              </label>
            ))}
          </motion.div>
        )}
      </AnimatePresence>


    </div>
  )
}

export default CategoriesDropdown