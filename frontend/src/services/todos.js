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
  if (categories) params.categories = categories

  console.log('params in getPage', params)

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


const update = (id, todoObject) => (
  axios.patch(`${todosUrl}/${id}`, todoObject).then(response => response.data)
)


export default { 
  getPage, 
  getAllTodos, 
  create, 
  remove, 
  update,
  setToken,
}