import TodoStatus from '../TodoStatus'

const TodoRow = ({ todo }) => {
  return (
    <tr>
      <td>1</td>
      <td>{todo.title}</td>
      <td><TodoStatus status={todo.status}/></td>
      <td>categories</td>
      <td>{todo.creationDate}</td>
    </tr>
  )
}

export default TodoRow