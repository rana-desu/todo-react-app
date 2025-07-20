const TodoContent = ({ status, title, description, remark, creationDate }) => {
  return (
    <div className="flex flex-col justify-start todos-content w-full">
      <p className="inline-flex justify-start todos-content whitespace-normal break-words p-4">{title}</p>
      <p
        className="inline-flex justify-start todos-content whitespace-normal break-words p-4"
        style={{ whiteSpace: "pre-wrap" }}
      >
        {description}
      </p>
      {status === "rejected" && (
        <p className="inline-flex justify-start todos-content whitespace-normal break-words p-4 text-zinc-600 italic">
          remarks: {remark}
        </p>
      )}
      <p className="inline-flex justify-start p-4 text-sm justify-end">
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