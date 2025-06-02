const TodoInput = ({ value, onChange, onKeyDown }) => {
  return (
    <textarea
      type="text"
      className="todo-input"
      placeholder="Enter TODO"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    ></textarea>
  )
}

export default TodoInput