const TodoContent = ({ title, description }) => {
  return (
    <div className="todos-content w-full">
      <p className="todos-content whitespace-normal break-words p-4">{title}</p>
      <p className="todos-content whitespace-normal break-words p-4">{description}</p>
    </div>
  )
}

export default TodoContent