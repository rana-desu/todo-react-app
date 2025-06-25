import TodoStatus from '../TodoStatus'
import ActionButtons from '../ActionButtons'
import Categories from '../Categories'

const TodoRow = ({ todo, onView, onEdit, onDelete }) => {
  return (
    <tr className="hover:bg-zinc-50/10">
      <td className="text-sm text-center">{todo.order}</td>
      <td className="text-sm truncate overflow-hidden whitespace-nowrap">{todo.title}</td>
      <td className="text-sm text-center">
        <div className="w-[184px] m-auto">
          <TodoStatus status={todo.status}/>
        </div>
      </td>
      <td className="text-sm text-center"><Categories /></td>
      <td className="text-sm text-center">
        <ActionButtons 
          onDelete={onDelete} 
          onView={onView} 
          onEdit={onEdit}
        />
      </td>
    </tr>
  )
}

export default TodoRow