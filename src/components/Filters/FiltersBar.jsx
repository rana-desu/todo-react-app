import useTodoStore from '@/store/todoStore'
import SortingFilters from './SortingFilters'
import StatusFilters from './StatusFilters'

const FiltersBar = () => {
  const { sortTodos } = useTodoStore()

  return (
    <div className="flex items-center justify-between mb-5 filters">
      <SortingFilters 
        onOldest={() => sortTodos('asc')}
        onLatest={() => sortTodos('desc')}
        className="border"
      />
      <StatusFilters className="border"/>
    </div>
  )
}

export default FiltersBar