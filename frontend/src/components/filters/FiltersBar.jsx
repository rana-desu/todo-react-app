import useTodoStore from '@/store/todoStore'
import SortingFilters from './SortingFilters'
import StatusFilters from './StatusFilters'
import TodoSearch from './TodoSearch'

const FiltersBar = () => {
  const { sortTodos, filterByCategory } = useTodoStore()

  return (
    <div className="flex items-center justify-between mb-5 filters">
      <div className="flex items-center">
      <SortingFilters 
        onOldest={() => sortTodos('asc')}
        onLatest={() => sortTodos('desc')}
        onFilterByCategory={filterByCategory}
        className="border"
      />

      <TodoSearch />
      </div>

      <StatusFilters className="border"/>
    </div>
  )
}

export default FiltersBar