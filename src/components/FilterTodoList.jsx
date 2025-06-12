import useTodoStore from '../store/todoStore'

const FilterTodoList = () => {
  const statuses = [
    'pending',
    'in-progress',
    'on-hold',
    'completed',
    'rejected',
  ]

  const { filter, setFilter } = useTodoStore()
  const filterSelected = (status) => setFilter(status)

  return (
    <div className="flex items-center justify-end">
      <label className="ml-3 cursor-pointer" key="all">
        <input 
          type="radio" 
          name="todo-status"
          value="all"
          onChange={(e) => filterSelected(e.target.value)}
          checked={"all" === filter.status}
          className="hidden"
        />
        <span className="cursor-pointer">
          all
        </span>
      </label>
      {
        statuses.map((status) => (
          <label className="ml-3 cursor-pointer" key={status}>
            <input 
              type="radio" 
              name="todo-status"
              value={status}
              checked={status === filter.status}
              onChange={(e) => filterSelected(e.target.value)}
              className="hidden"
            />
            <span className="cursor-pointer">
              {status}
            </span>
          </label>
        ))
      }
    </div>
  )
}

export default FilterTodoList
