import { useState, useRef, useEffect } from 'react'

const categoriesList = ['work', 'personal', 'chores']

const CategoriesDropdown = ({ categories, setCategories }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const toggleDropdown = () => setIsOpen(!isOpen)

  const handleCheckbox = (category) => {
    setCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
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
    <div className="relative w-1/2 mb-4" ref={dropdownRef}>
      <button
        type="button"
        onClick={toggleDropdown} 
        className="p-4 border border-zinc-50/10 hover:border-zinc-50/20 cursor-pointer w-full"
      >
        {categories.length > 0 ? categories.join(', ') : 'Select Categories'}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full rounded shadow-lg z-20 bg-zinc-800">
          {categoriesList.map(category => (
            <label
              key={category}
              className={`flex items-center px-4 py-3 hover:bg-zinc-700 cursor-pointer ${categories.includes(category) ? 'bg-zinc-700' : ''}`}
            >
              <input 
                type="checkbox"
                value={category}
                checked={categories.includes(category)}
                onChange={() => handleCheckbox(category)}
                className="mr-2 hidden"
              />
              {category}
            </label>
          ))}
        </div>
      )}
    </div>
  )
}

export default CategoriesDropdown