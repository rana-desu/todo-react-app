import TodoInput from './TodoInput'
import AddIcon from '../assets/add.svg'

const TodoForm = ({ todoId, editedContent, handleSubmit, handleChange, value, classes }) => {
  const onEnterKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
      handleSubmit(todoId, editedContent)
    }
  }

  switch (classes) {
    case 'add-form':
      return (
        <form action="" onSubmit={handleSubmit} className={classes}>
          <TodoInput 
            value={value} 
            handleChange={handleChange} 
            onKeyDown={onEnterKeyDown}
          />
          <button className="add-button"><img src={AddIcon} alt="" />
          </button>
        </form>
      )
  
    default:
      return (
        <form action="" onSubmit={handleSubmit} className={classes}>
          <TodoInput 
            value={value} 
            handleChange={handleChange} 
            onKeyDown={onEnterKeyDown}
          />
        </form>
      )
  }
}
export default TodoForm
