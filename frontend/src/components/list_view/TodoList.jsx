import { AnimatePresence } from 'motion/react'
import Todo from './Todo'
import useTodoStore from '../../store/todoStore'

const TodoList = () => {
  const { filteredTodos } = useTodoStore()
  const visibleTodos = filteredTodos()

  return (
    <ul className="flex flex-col item-center justify-start h-full">
      <AnimatePresence mode="popLayout">
        {visibleTodos.map((todo) =>
          <Todo 
            key={todo.id} 
            todo={todo}
          />
        )}
      </AnimatePresence>
    </ul>
  )
}

export default TodoList
