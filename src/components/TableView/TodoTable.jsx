import useTodoStore from '../../store/todoStore'
import TodoRow from './TodoRow'

const TodoTable = () => {
  const { filteredTodos } = useTodoStore()
  const visibleTodos = filteredTodos()

  return (
    <table className="table-fixed">
      <thead>
        <tr>
          <th>S. No.</th>
          <th>Title</th>
          <th>Status</th>
          <th>Categories</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
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