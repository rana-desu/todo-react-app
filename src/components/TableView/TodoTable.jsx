import { useEffect } from 'react'
import useTodoStore from '@/store/todoStore'
import TodoRow from './TodoRow'

const TodoTable = () => {
  const { 
    filteredTodos,
    currentPage,
    totalPages,
    fetchTodosPage,
   } = useTodoStore()

  const visibleTodos = filteredTodos()

  useEffect(() => {
    fetchTodosPage(currentPage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  console.log('total pages:', totalPages)

  return (
    <>
    <table className="min-w-full table-fixed border-collapse border border-zinc-50/10 divide-y divide-gray-200/50">
      <thead className="divide-x divide-zinc-50/10">
        <tr>
          <th className="w-20 px-2 py-4">S. No.</th>
          <th className="w-xl max-w-xl px-2 py-4">Title</th>
          <th className="w-50 px-2 py-4">Status</th>
          <th className="w-xs px-2 py-4">Categories</th>
          <th className="w-45 2px-2 py-4">Actions</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-x divide-zinc-50/10">
        {
          visibleTodos.map(todo => (
            <TodoRow
              key={todo.id}
              todo={todo}
            />
          ))
        }
      </tbody>
    </table>

    <div className="flex gap-2">
      {Array.from({ length: totalPages }).map((_, i) => (
        <button
          key={i}
          onClick={() => fetchTodosPage(i + 1)}
          className={i + 1 === currentPage ? 'font-bold' : ''}
        >
          {i + 1}
        </button>
      ))}
    </div>
    </>
  ) 
}

export default TodoTable