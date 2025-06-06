import axios from 'axios'

const baseUrl = 'http://localhost:3001/todos'

const getAll = () => axios.get(baseUrl).then(response => response.data)

const create = async (todoObject) => {
  try {
    console.log('before POST request');
    const response = await axios.post(baseUrl, todoObject)
    console.log('after POST request');
    return response.data
  } catch (err) {
    console.error('POST request failed:', err)
    throw err
  }
}

const remove = (id) => axios.delete(`${baseUrl}/${id}`)

const update = (id, todoObject) => (
    axios.put(`${baseUrl}/${id}`, todoObject).then(response => response.data)
)

export default { getAll, create, remove, update }