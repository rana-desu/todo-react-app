import axios from 'axios'

const todosUrl  = '/api/todos'


const getPage = async (
  searchBy, searchTerm,
  status,
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

  const response = await axios.get(todosUrl, { params })

  return response.data
}


const getAllTodos = async () => (
  await axios.get(todosUrl).then(response => response.data)
)


const create = async (todoObject) => {
    const response = await axios.post(todosUrl, todoObject)
    return response.data
}


const remove = (id) => (
  axios.delete(`${todosUrl}/${id}`)
)


const update = (id, todoObject) => (
  axios.patch(`${todosUrl}/${id}`, todoObject).then(response => response.data)
)


export default { getPage, getAllTodos, create, remove, update }