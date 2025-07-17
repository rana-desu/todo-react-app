const todosRouter = require('express').Router()
const buildFilter = require('../utils/buildFilter')
const Todo = require('../models/todo')

todosRouter.get('/', async (request, response, next) => {
    const { 
        sort = 'createdAt',
        order = 'asc',
        page = 1,
        limit = 20,
        ...query
    } = request.query

    const filter = buildFilter(query)
    const sortOrder = order === 'desc' ? -1 : 1

    const todos = await Todo
        .find({ user: request.user, ...filter})
        .populate('user', { username: 1, name: 1 })
        .sort({ [sort]: sortOrder })
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .catch(error => next(error))

    const totalTodos = await Todo.countDocuments(
        { user: request.user, ...filter }
    )

    response.json({
        data: todos,
        totalTodos,
        page: parseInt(page),
        totalPages: Math.ceil(totalTodos / parseInt(limit))
    })
})

todosRouter.post('/', async (request, response) => {
    const body = request.body
    const user = request.user

    if (!user) {
        return response.status(400).json({ error: 'userId missing or invalid.' })
    }

    const todo = new Todo({
        title: body.title,
        description: body.description,
        status: body.status || 'pending',
        categories: body.categories,
        user: user._id,
    })

    const savedTodo = await todo.save()
    user.todos = user.todos.concat(savedTodo._id)
    await user.save()

    response.json(savedTodo)
})

todosRouter.delete('/:id', async (request, response) => {
    if (!request.token) {
        return response
            .status(400)
            .json({
                error: 'The request must contain a valid token.'
            })
    }

    const user = request.user
    const todo = await Todo.findById(request.params.id)

    if (user._id.toString() !== todo.user.toString()) {
        return response
            .status(401)
            .json({
                error: 'Unauthorized request.'
            })
    }

    await Todo.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

todosRouter.patch('/:id', async (request, response) => {
    const { title, description, remark, status } = request.body

    const todo = await Todo.findById(request.params.id)

    if (!todo) {
        return response.status(404).end()
    }

    todo.title = title
    todo.description = description
    todo.remark = remark
    todo.status = status

    const savedTodo = todo.save()
    response.json(savedTodo)
})

module.exports = todosRouter
