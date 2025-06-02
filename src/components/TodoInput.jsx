const TodoInput = ({ value, handleChange, onKeyDown }) => {
  return (
    <textarea
      type="text"
      className="todo-input"
      placeholder="Enter TODO"
      value={value}
      onChange={handleChange}
      onKeyDown={onKeyDown}
    ></textarea>
  )
}

export default TodoInput