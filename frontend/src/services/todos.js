import axios from 'axios'
const todosUrl  = '/api/todos'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getPage = async (
  searchBy, searchTerm,
  status,
  categories,
  page = 1, limit = 20,
  order = 'asc'
) => {
  const params = {
    page, limit, order,
  }

  if (status !== 'all') params.status = status
  if (searchTerm?.trim()) {
    params.searchBy = searchBy
    params.searchTerm = searchTerm
  }
  if (categories && categories.length > 0) params.categories = categories.join(',')

  console.log('requesting params: ', params)

  const response = await axios.get(
    todosUrl, {
      headers: { Authorization: token },
      params: params,
      paramsSerializer: {
        indexes: null
      },
    }
  )

  return response.data
}


const getAllTodos = async () => (
  await axios.get(todosUrl).then(response => response.data)
)


const create = async (todoObject) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(todosUrl, todoObject, config)
  return response.data
}


const remove = (id) => (
  axios.delete(
    `${todosUrl}/${id}`, {
      headers: { Authorization: token }
    }
  )
)


const update = async (id, todoObject) => {
  const response = await axios.patch(`${todosUrl}/${id}`, todoObject, {
    headers: { Authorization: token }
  })

  return response.data
}


const getStats = async () => {
  const response = await axios.get(`${todosUrl}/stats`, {
    headers: { Authorization: token }
  })

  return response.data
}


export default { 
  getPage, 
  getAllTodos, 
  create, 
  remove, 
  update,
  setToken,
  getStats,
}