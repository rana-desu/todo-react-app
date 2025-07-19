import axios from 'axios'
const loginUrl = '/api/login'
const usersUrl = '/api/users'

const signup = async details => {
  const response = await axios.post(usersUrl, details)
  return response.data
}

const login = async credentials => {
  const response = await axios.post(loginUrl, credentials)
  return response.data
}

export default {
  signup,
  login,
}