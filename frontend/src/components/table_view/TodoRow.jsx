import TodoStatus from '../utils/TodoStatus'
import ActionButtons from '../utils/ActionButtons'
import Categories from '../utils/Categories'

const TodoRow = ({ todo, serial, onDelete }) => {
  return (
    <tr className="hover:bg-zinc-50/10">
      <td className="text-sm text-center">{serial}</td>
      <td className="text-sm truncate overflow-hidden whitespace-nowrap">{todo.title}</td>
      <td className="text-sm text-center">
        <div className="w-[184px] m-auto">
          <TodoStatus status={todo.status}/>
        </div>
      </td>
      <td className="text-sm text-center"><Categories categories={todo.categories}/></td>
      <td className="text-sm text-center">
        <ActionButtons
          todo={todo} 
          onDelete={onDelete}
        />
      </td>
    </tr>
  )
}

export default TodoRow