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
      <h2 className="text-2xl py-4 font-bold">Signup</h2>
      <div>
        Username:
        <input 
          value={username}
          type="text"
          onChange={({ target }) => setUsername(target.value)}
          name="Username"
          className="p-5 my-2 min-w-2xl border-1 border-zinc-50/10 bg-opacity-[0.01] outline-none rounded-sm w-full"
        />
      </div>
      <div>
        Name:
        <input 
          value={name}
          type="text"
          onChange={({ target }) => setName(target.value)}
          name="Name"
          className="p-5 my-2 min-w-2xl border-1 border-zinc-50/10 bg-opacity-[0.01] outline-none rounded-sm w-full"
        />
      </div>
      <div>
        Password:
        <input 
          value={password}
          type="password"
          onChange={({ target }) => setPassword(target.value)}
          name="Password"
          className="p-5 my-2 min-w-2xl border-1 border-zinc-50/10 bg-opacity-[0.01] outline-none rounded-sm w-full"
        />
      </div>

      <Button type="submit" label="signup"/>
    </form>
  )
}

export default SignupForm