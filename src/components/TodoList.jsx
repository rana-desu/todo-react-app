import Todo from './Todo'
import useTodoStore from '../store/todoStore'

const TodoList = () => {
  const { filteredTodos } = useTodoStore()

  const visibleTodos = filteredTodos()
  console.log('visible', visibleTodos)

  return (
    <ul className="flex flex-col item-center justify-start h-full">
      {visibleTodos.map((todo) =>
        <Todo 
          key={todo.id} 
          todo={todo}
        />
      )}
    </ul>
  )
}

export default TodoList
