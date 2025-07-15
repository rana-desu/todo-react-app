import { useEffect } from 'react'
import useTodoStore from './store/todoStore'
import useUserStore from './store/userStore'

import LoginForm from './components/LoginForm'
import { AddTodo } from './components/modals'
import { TodoTable } from './components/table_view'

const App = () => {
  const { user } = useUserStore()

  useEffect(() => {
    useTodoStore.getState().fetchTodosPage(1)
  }, [])

  const loginForm = () => (
    <LoginForm loginUser={useUserStore.getState().loginUser}/>
  )

  return (
    <div className="page-wrapper overflow-x-auto bg-linear-to-r bg-radial-[at_25%_25%] from-zinc-900 to-black to-70% min-h-screen w-screen">
      <h1 className="w-screen text-center p-8 text-5xl font-bold">TODO App</h1>

      <section className="flex flex-col m-auto w-7xl mt-5">
      {
        user === null ? (
          loginForm()
        ) : (
          <AddTodo />
        )
      }
      </section>

      <section className="flex flex-col m-auto w-7xl mt-5">
        <TodoTable />
      </section>

      <div className="h-[250px] mt-20"></div>
    </div>
  )
}

export default App