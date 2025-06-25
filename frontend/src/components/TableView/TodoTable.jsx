import { useState, useEffect } from 'react'
import { AnimatePresence } from 'motion/react'
import { EditTodo, ViewTodo } from '../Modals'
import { FiltersBar } from '../Filters'
import useTodoStore from '@/store/todoStore'
import TodoRow from './TodoRow'
import PaginateRow from '../PaginateRow'

const TodoTable = () => {
  const { 
    todos, 
    editTodo, 
    deleteTodo, 
    currentPage, 
    fetchTodosPage,
   } = useTodoStore()

  const [editingTodo, setEditingTodo] = useState(null)
  const [viewingTodo, setViewingTodo] = useState(null)
  
  useEffect(() => {
    fetchTodosPage(currentPage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  return (
    <>
    <FiltersBar />

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
          todos.map(todo => (
            <TodoRow
              key={todo.id}
              todo={todo}
              onEdit={() => setEditingTodo(todo)}
              onView={() => setViewingTodo(todo)}
              onDelete={() => deleteTodo(todo.id)}
            />
          ))
        }
      </tbody>
    </table>

    <AnimatePresence>
    {viewingTodo && (
      <ViewTodo
        todo={viewingTodo}
        onClose={() => setViewingTodo(null)}
      />
    )}      
    </AnimatePresence>

    <AnimatePresence>
    {editingTodo && (
      <EditTodo
        todo={editingTodo}
        onEdit={editTodo}
        onCancel={() => setEditingTodo(null)}
      />
    )}      
    </AnimatePresence>
    
    <PaginateRow />
    </>
  ) 
}

export default TodoTable