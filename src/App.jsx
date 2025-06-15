import { useEffect } from 'react'
import useTodoStore from './store/todoStore'

import { AddTodo } from './components/Modals'
import FilterTodos from './components/StatusFilters'
import { TodoTable } from './components/TableView'

const App = () => {
  // fetches Todos from the backend server on the first render
  useEffect(() => {
    useTodoStore.getState().fetchTodosPage(1)
  }, [])

  return (
    <div className="page-wrapper overflow-x-auto bg-linear-to-r bg-radial-[at_25%_25%] from-zinc-900 to-black to-70% min-h-screen w-screen">
      <h1 className="w-screen text-center p-8 text-5xl font-bold">TODO App</h1>
      
      <section className="flex flex-col m-auto w-7xl mt-5">
        <AddTodo />
      </section>

      <section className="flex flex-col m-auto w-7xl mt-5">
        <FilterTodos />
        <TodoTable />
      </section>

      <div className="h-[250px] mt-20"></div>
    </div>
  )
}

export default App