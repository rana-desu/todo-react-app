import useTodoStore from '@/store/todoStore'

const PaginateRow = () => {
  const { currentPage, totalPages, fetchTodosPage } = useTodoStore()
  console.log('totalPages in PaginateRow', totalPages)

  return (
    <div className="m-auto mt-5 flex gap-2">
      <button 
        onClick={() => fetchTodosPage(currentPage - 1)}
        className={`cursor-pointer ${currentPage > 1 ? '' : 'pointer-events-none opacity-50 cursor-not-allowed'}`}
      >
        prev
      </button>
      {Array.from({ length: totalPages }).map((_, i) => (
        <button
          key={i}
          onClick={() => fetchTodosPage(i + 1)}
          className={`cursor-pointer ${i + 1 === currentPage ? 'font-bold' : ''}`}
        >
          {i + 1}
        </button>
      ))}
      <button 
        onClick={() => fetchTodosPage(currentPage + 1)}
        className={`cursor-pointer ${currentPage < totalPages ? '' : 'pointer-events-none opacity-50 cursor-not-allowed'}`}
      >
        next
      </button>
    </div>
  )
}

export default PaginateRow