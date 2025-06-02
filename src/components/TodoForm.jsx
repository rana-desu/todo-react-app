import TodoInput from './TodoInput'
import AddIcon from '../assets/add.svg'

const TodoForm = ({ todoId, editedContent, onSubmit, onChange, value, classes }) => {
  const onEnterKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSubmit(e)
      onSubmit(todoId, editedContent)
    }
  }

  switch (classes) {
    case 'add-form':
      return (
        <form action="" onSubmit={onSubmit} className={classes}>
          <TodoInput 
            value={value} 
            onChange={onChange} 
            onKeyDown={onEnterKeyDown}
          />
          <button className="add-button"><img src={AddIcon} alt="" />
          </button>
        </form>
      )
  
    default:
      return (
        <form action="" onSubmit={onSubmit} className={classes}>
          <TodoInput 
            value={value} 
            onChange={onChange} 
            onKeyDown={onEnterKeyDown}
          />
        </form>
      )
  }
}
export default TodoForm
