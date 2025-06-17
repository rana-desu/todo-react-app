import useTodoStore from '@/store/todoStore'
import SortingFilters from './SortingFilters'
import StatusFilters from './StatusFilters'
import TodoSearch from './TodoSearch'

const FiltersBar = () => {
  const { sortTodos } = useTodoStore()

  return (
    <div className="flex items-center justify-between mb-5 filters">
      <div className="flex items-center">
      <SortingFilters 
        onOldest={() => sortTodos('asc')}
        onLatest={() => sortTodos('desc')}
        className="border"
      />

      <TodoSearch />
      </div>

      <StatusFilters className="border"/>
    </div>
  )
}

export default FiltersBar