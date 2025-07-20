import EditTodo from './EditTodo'
import ViewTodo from './ViewTodo'
import DeleteTodo from './DeleteTodo'

const ActionButtons = ({ todo, onDelete }) => {
  return (
    <div className="flex items-center justify-center gap-4">
      <ViewTodo todo={todo}/>

      <EditTodo todo={todo}/>

      <DeleteTodo onConfirm={onDelete}/>
    </div>
  )
}

export default ActionButtons