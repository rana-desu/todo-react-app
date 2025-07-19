import { useState } from 'react'
import Button from './Button'

const SignupForm = ({ signupUser }) => {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const handleSignup = async (event) => {
    event.preventDefault()

    const details = {
      username,
      name,
      password,
    }

    await signupUser(details)
    setUsername('')
    setName('')
    setPassword('')
  }

  console.log('loading signupform!')

  return (
    <form onSubmit={handleSignup}>
      <h2>Signup</h2>
      <div>
        Username:
        <input 
          value={username}
          type="text"
          onChange={({ target }) => setUsername(target.value)}
          name="Username"
        />
      </div>
      <div>
        Name:
        <input 
          value={name}
          type="text"
          onChange={({ target }) => setName(target.value)}
          name="Name"
        />
      </div>
      <div>
        Password:
        <input 
          value={password}
          type="password"
          onChange={({ target }) => setPassword(target.value)}
          name="Password"
        />
      </div>

      <Button type="submit" label="signup"/>
    </form>
  )
}

export default SignupForm