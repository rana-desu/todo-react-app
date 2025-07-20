import useTodoStore from '../store/todoStore'

const ResultStats = () => {
  const {
    searchBy,
    searchTerm,
    sortOrder,
    categoryFilter,
    statusFilter,
    totalTodos,
  } = useTodoStore()

  const filters = [
    sortOrder && `in ${sortOrder === 'asc' ? 'oldset first' : 'latest first'} order`,
    searchTerm && `with the ${searchBy} as '${searchTerm}'`,
    categoryFilter.length > 0 ? `with categories: ${categoryFilter.join(', ')}` : false,
    statusFilter && `with status '${statusFilter}'`
  ].filter(Boolean)

  return (
    <div className="text-2xl py-4">
      {
        filters.length > 0
          ? <>Showing <strong>{totalTodos} todo(s)</strong> as result {filters.join(', ')}.</>
          : `Showing all results in ${sortOrder} order.`
      }
    </div>
  )
}

export default ResultStats