const TodoContent = ({ status, title, description, remark, createdBy, creationDate }) => {
  const date = new Date(creationDate)
    .toLocaleString("en-IN", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })

  return (
    <div className="flex flex-col justify-start todos-content w-full">
      <p className="inline-flex justify-start todos-content whitespace-normal break-words p-4">{title}</p>

      <p className="inline-flex justify-start todos-content whitespace-normal break-words p-4"
        style={{ whiteSpace: "pre-wrap" }}>
        {description}
      </p>

      {status === "rejected" && (
        <p className="inline-flex justify-start todos-content whitespace-normal break-words p-4 text-zinc-600 italic">
          remarks: {remark}
        </p>
      )}

      <p className="inline-flex justify-end p-4 text-sm">
        {`created by ${createdBy}`}
        {`, at ${date}`}
      </p>
    </div>
  )
}

export default TodoContent