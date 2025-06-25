const TodoContent = ({ status, title, description, remark, creationDate }) => {
  return (
    <div className="flex flex-col todos-content w-full">
      <p className="todos-content whitespace-normal break-words p-4">{title}</p>
      <p
        className="todos-content whitespace-normal break-words p-4"
        style={{ whiteSpace: "pre-wrap" }}
      >
        {description}
      </p>
      {status === "rejected" && (
        <p className="todos-content whitespace-normal break-words p-4 text-zinc-600 italic">
          remarks: {remark}
        </p>
      )}
      <p className="p-4 text-sm justify-end">
        at{" "}
        {new Date(creationDate).toLocaleString("en-IN", {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })
        }
      </p>
    </div>
  )
}

export default TodoContent