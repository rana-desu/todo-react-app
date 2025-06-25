import axios from 'axios'

const todosUrl  = 'http://localhost:3001/api/todos'

const getPage = async (page, pageSize, statusFilter, sortOrder = 'asc') => {
  try {
    const baseUrl = `${todosUrl}?page=${page}&limit=${pageSize}&sort=createdAt&order=${sortOrder}`
    const url = statusFilter === 'all'
      ? baseUrl
      : `${baseUrl}&status=${statusFilter}`

    const returnedPage = await axios.get(url).then(response => response.data)
    console.log('returned page from backend:', returnedPage)
    return returnedPage

  } catch (err) {
    console.error('GET request failed:', err)
    throw err
  }
}

const getAllTodos = async () => (
  await axios.get(todosUrl).then(response => response.data)
)

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

export default { getPage, getAllTodos, create, remove, update }