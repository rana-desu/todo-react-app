import { useRef } from 'react'
import TodoContent from '../utils/TodoContent'
import TodoStatus from '../utils/TodoStatus'
import Categories from '../utils/Categories'
import Modal from '../modals/Modal'
import ViewIcon from '@/assets/view.svg?react'
import CloseIcon from '@/assets/delete.svg?react'

const ViewTodo = ({ todo }) => {
  const viewTodoRef = useRef()

  const toggleViewModal = () => viewTodoRef.current.toggleOpened()

  return (
    <>
    <button onClick={toggleViewModal}>
      <ViewIcon className="fill-zinc-50/60 hover:fill-zinc-50/80"/>
    </button>

    <Modal layoutId={`todo-${todo.id}`} ref={viewTodoRef}>
      <div 
        className="flex flex-row items-center justify-between w-full">
        <TodoStatus status={todo.status} />

        <button
          className="cursor-pointer mr-2" 
          onClick={toggleViewModal}
        >
          <CloseIcon />
        </button>
      </div>

      <div className="w-full flex items-center justify-start p-4">
        <TodoContent
          status={todo.status}
          title={todo.title} 
          description={todo.description}
          remark={todo.remark}
          createdBy={todo.user.name}
          creationDate={todo.createdAt}
        />
      </div>

      <div className="flex flex-row justify-between actions w-full border-t px-2 border-zinc-50/10">
        <Categories categories={todo.categories}/>
      </div>
    </Modal>
    </>
  )
}

export default ViewTodo