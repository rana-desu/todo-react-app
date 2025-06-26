const todosRouter = require('express').Router()
const Todo = require('../models/todo')
const buildFilter = require('../utils/buildFilter')

todosRouter.get('/', async (request, response, next) => {
    console.log(request.query)
    const { 
        sort = 'createdAt',
        order = 'asc',
        page = 1,
        limit = 20,
        ...query
    } = request.query

    const filter = buildFilter(query)
    const sortOrder = order === 'desc' ? -1 : 1

    const todos = await Todo.find(filter)
        .sort({ [sort]: sortOrder })
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .catch(error => next(error))

    const totalTodos = await Todo.countDocuments(filter)

    response.json({
        data: todos,
        totalTodos,
        page: parseInt(page),
        totalPages: Math.ceil(totalTodos / parseInt(limit))
    })
})

todosRouter.post('/', (request, response, next) => {
    const body = request.body

    const todo = new Todo({
        title: body.title,
        description: body.description,
        status: body.status || 'pending',
        categories: body.categories,
    })

    todo.save()
        .then(savedTodo => response.json(savedTodo))
        .catch(error => next(error))
})

todosRouter.delete('/:id', (request, response, next) => {
    Todo.findByIdAndDelete(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

todosRouter.patch('/:id', (request, response, next) => {
    const { title, description, remark, status } = request.body

    Todo.findById(request.params.id)
        .then(todo => {
            if (!todo) {
                return response.status(404).end()
            }

            todo.title = title
            todo.description = description
            todo.remark = remark
            todo.status = status

            return (
                todo.save()
                    .then(savedNote => {
                        response.json(savedNote)
                    })
                    .catch(error => next(error))

            )
        })
})

module.exports = todosRouter
