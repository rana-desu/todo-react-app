import axios from 'axios'

const todosUrl  = 'http://localhost:3001/todos'
const configUrl = 'http://localhost:3001/config'

const getAll = () => axios.get(todosUrl).then(response => response.data)

const create = async (todoObject) => {
  try {
    const response = await axios.post(todosUrl, todoObject)
    return response.data
  } catch (err) {
    console.error('POST request failed:', err)
    throw err
  }
}

const remove = (id) => (
  axios.delete(`${todosUrl}/${id}`)
)

const update = (id, todoObject) => (
  axios.patch(`${todosUrl}/${id}`, todoObject).then(response => response.data)
)

const getConfig = () => (
  axios.get(configUrl).then(response => response.data)
)

const setFilter = (status) => (
  axios.patch(`${configUrl}/1`, { status }).then(response => response.data)
)

export default { getAll, create, remove, update, getConfig, setFilter }