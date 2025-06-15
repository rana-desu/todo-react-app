import useTodoStore from '../../store/todoStore'
import TodoRow from './TodoRow'

const TodoTable = () => {
  const { filteredTodos } = useTodoStore()
  const visibleTodos = filteredTodos()

  return (
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
  ) 
}

export default TodoTable