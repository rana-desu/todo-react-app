import axios from 'axios'

const baseUrl = 'http://localhost:3001/todos'

const render = () => axios.get(baseUrl).then(response => response.data)

const create = (todoObject) => axios
    .post(baseUrl, todoObject)
    .then(response => response.data)

const remove = (id) => axios.delete(`${baseUrl}/${id}`)

const update = (id, todoObject) => 
    axios.put(`${baseUrl}/${id}`, todoObject)
        .then(response => response.data)

export default { render, create, remove, update }