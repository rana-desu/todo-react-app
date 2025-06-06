import { useEffect } from 'react'
import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'
import useTodoStore from './store/todoStore'

const App = () => {
  useEffect(() => {
    useTodoStore.getState().fetchTodos()
  }, [])

  const subHeaderStyles = `text-3xl font-bold mb-3`
  const sectionParaStyles = 'mb-3'

  return (
    <div className="page-wrapper bg-linear-to-r bg-radial-[at_25%_25%] from-zinc-900 to-black to-70% min-h-screen w-screen">
      <h1 className="w-screen text-center p-8 text-5xl font-bold">TODO App</h1>

      <section className="flex flex-col m-auto w-3xl mt-5">
        <h2 className={subHeaderStyles}>Adding Todos</h2>
        <p className={sectionParaStyles}>
          Input a title, description, and categories to your todo.
          The default status for a new todo is 'pending', it can be changed below.
        </p>
        <AddTodo />
      </section>

      <section className="flex flex-col m-auto w-3xl mt-5">
        <h2 className={subHeaderStyles}>My Todos</h2>
        <p className={sectionParaStyles}>
          Your todos when created, appear here.
          Click on the action button for more options.
        </p>
        <TodoList />
      </section>
    </div>
  )
}

export default App