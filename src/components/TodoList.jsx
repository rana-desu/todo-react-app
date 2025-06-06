import Todo from './Todo'
import useTodoStore from '../store/todoStore'

const TodoList = () => {
  const { todos } = useTodoStore()
  
  return (
    <ul className="flex flex-col item-center justify-start h-full">
      {todos.map((todo) =>
        <Todo 
          key={todo.id} 
          todo={todo}
        />
      )}
    </ul>
  )
}

export default TodoList
