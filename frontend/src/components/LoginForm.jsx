import { useState } from 'react'
import Button from './Button'

const LoginForm = ({ loginUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async event => {
    event.preventDefault()

    const credentials = {
      username,
      password,
    }

    await loginUser(credentials)
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <div>
        Username: 
        <input 
          type="text" 
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          name="Username"
        />
      </div>
      <div>
        Password: 
        <input 
          type="password" 
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          name="Password"
        />
      </div>

      <Button type="submit" label="login"/>
    </form>
  )
}

export default LoginForm