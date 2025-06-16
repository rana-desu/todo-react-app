import axios from 'axios'

const todosUrl  = 'http://localhost:3001/todos'
const configUrl = 'http://localhost:3001/config'

const getAll = () => axios.get(todosUrl).then(response => response.data)

/* getPage: 
   retrieve a page of a fixed size (as requested by the client) from the backend server.
   statusFilter: pending, rejected, completed, etc.
   sortBy: sorts by the provided property in ASC order.
 */
const getPage = async (page, pageSize, statusFilter, sortBy = 'createdAt', sortOrder = 'desc') => {
  try {
    const baseUrl = `${todosUrl}?_page=${page}&_per_page=${pageSize}&_sort=${sortBy}&_order=${sortOrder}`
    const url = (statusFilter === 'all')
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

export default { getAll, getPage, create, remove, update, getConfig, setFilter }