import AddIcon from '../assets/add.svg'

const TodoForm = ({ onSubmit, onChange, value }) => {
  const formStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '484px',
    margin: '8px',
    marginBottom: '30px',
  }
  const inputStyle = {
    width: '400px'
  }

  return (
    <form action="" onSubmit={onSubmit} style={formStyle}>
      <input
        type="text"
        placeholder="Enter TODO"
        value={value}
        onChange={onChange}
        style={inputStyle}
      />

      <button className="add-button"><img src={AddIcon} alt="" /></button>
    </form>
  )
}

export default TodoForm
