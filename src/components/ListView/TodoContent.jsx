const TodoContent = ({ status, title, description, remark, creationDate }) => {
  return (
    <div className="todos-content w-full">
      <p className="todos-content whitespace-normal break-words p-4">{title}</p>
      <p className="todos-content whitespace-normal break-words p-4" style={{whiteSpace: "pre-wrap"}}>{description}</p>
      {
        status === 'rejected' && (
          <p className="todos-content whitespace-normal break-words p-4 text-zinc-600 italic">remarks: {remark}</p>
        )
      }
      <p>{creationDate}</p>
    </div>
  )
}

export default TodoContent