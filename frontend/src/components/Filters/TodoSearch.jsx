import { useTodoStore } from '@/store'

const TodoSearch = () => {
  const { searchTerm, searchTodos } = useTodoStore()
  
  const handleChange = (e) => {
    searchTodos(e.target.value)
  }

  console.log(searchTerm)

  return (
    <div>
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