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
      <h2 className="text-2xl py-4 font-bold">Login</h2>
      <div>
        Username: 
        <input 
          type="text" 
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          name="Username"
          className="p-5 my-2 min-w-2xl border-1 border-zinc-50/10 bg-opacity-[0.01] outline-none rounded-sm w-full"
        />
      </div>
      <div>
        Password: 
        <input 
          type="password" 
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          name="Password"
          className="p-5 my-2 min-w-2xl border-1 border-zinc-50/10 bg-opacity-[0.01] outline-none rounded-sm w-full"
        />
      </div>

      <Button type="submit" label="login"/>
    </form>
  )
}

export default LoginForm