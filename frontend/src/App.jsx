import { useEffect } from 'react'
import useTodoStore from './store/todoStore'
import useUserStore from './store/userStore'

import { AddTodo } from './components/modals'
import { TodoTable } from './components/table_view'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import ResultStats from './components/ResultStats'
import Togglable from './components/Togglable'
import Button from './components/Button'

const App = () => {
  const { user, signupUser, loginUser, logoutUser } = useUserStore()

  useEffect(() => {
    useTodoStore.getState().fetchTodosPage(1)
  }, [])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      useUserStore
        .getState()
        .setUser(JSON.parse(loggedInUser))
    }
  }, [])

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm loginUser={loginUser}/>
    </Togglable>
  )

  const signupForm = () => (
    <Togglable buttonLabel="signup">
      <SignupForm signupUser={signupUser}/>
    </Togglable>
  )

  return (
    <div className="page-wrapper overflow-x-auto bg-linear-to-r bg-radial-[at_25%_25%] from-zinc-900 to-black to-70% min-h-screen w-screen">
      <h1 className="w-screen text-center p-8 text-5xl font-bold">TODO App</h1>

      <section className="flex flex-col m-auto w-7xl mt-5">
      {
        user === null ? (
          <div className="flex align-center justify-center gap-8">
            {signupForm()}
            {loginForm()}
          </div>
        ) : (
          <>
          <div className="flex align-center justify-end gap-8">
            <Button onClick={logoutUser} label="logout" variant="cancel"/>
            <AddTodo />
          </div>
          <ResultStats />
          <TodoTable />
          </>
        )
      }
      </section>

      <section className="flex flex-col m-auto w-7xl mt-5">
      </section>

      <div className="h-[250px] mt-20"></div>
    </div>
  )
}

export default App