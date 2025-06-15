import { useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { useTodoStore } from '@/store'
import { EditTodo } from '../Modals'
import TodoStatus from '../TodoStatus'
import ActionButtons from '../ActionButtons'
import Categories from '../Categories'

const TodoRow = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false)
  const { deleteTodo, editTodo } = useTodoStore()

  return (
    <>
    <tr className="hover:bg-zinc-50/10">
      <td className="text-sm text-center">{todo.order}</td>
      <td className="text-sm truncate overflow-hidden whitespace-nowrap">{todo.title}</td>
      <td className="text-sm text-center"><div className="w-[184px] m-auto"><TodoStatus status={todo.status}/></div></td>
      <td className="text-sm text-center"><Categories /></td>
      <td className="text-sm text-center"><ActionButtons onDelete={() => deleteTodo(todo.id)} onEdit={() => setIsEditing(true)}/></td>
    </tr>

    <AnimatePresence>
    {isEditing && (
      <EditTodo
        todo={todo}
        onEdit={editTodo}
        onCancel={() => setIsEditing(false)}
      />
    )}      
    </AnimatePresence>
    </>
  )
}

export default TodoRow