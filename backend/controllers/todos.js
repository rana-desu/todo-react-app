const todosRouter = require('express').Router()
const buildFilter = require('../utils/buildFilter')
const isAuthenticated = require('../policies/isAuthenticated')
const isOwner = require('../policies/isOwner')
const todoStats = require('../aggregations/todoStats')
const Todo = require('../models/todo')

todosRouter.get('/', isAuthenticated, async (request, response, next) => {
    const { 
        sort = 'createdAt',
        order = 'asc',
        page = 1,
        limit = 20,
        ...query
    } = request.query

    const filter = buildFilter(query)
    const sortOrder = order === 'desc' ? -1 : 1

    const user = request.user 
    const roleAccessFilter = user.role === 'admin' ? {} : { user } 

    const todos = await Todo
        .find({ ...roleAccessFilter, ...filter})
        .populate('user', { username: 1, name: 1 })
        .sort({ [sort]: sortOrder })
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .catch(error => next(error))

    const totalTodos = await Todo.countDocuments({ 
        ...roleAccessFilter, 
        ...filter 
    })

    response.json({
        data: todos,
        totalTodos,
        page: parseInt(page),
    })
})

todosRouter.post('/', isAuthenticated, async (request, response) => {
    const body = request.body
    const user = request.user

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

todosRouter.delete('/:id', isAuthenticated, isOwner, async (request, response) => {
    if (!request.token) {
        return response
            .status(400)
            .json({
                error: 'The request must contain a valid token.'
            })
    }

    await Todo.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

todosRouter.patch('/:id', isAuthenticated, isOwner, async (request, response) => {
    const { title, description, remark, status, categories } = request.body

    const todo = await Todo.findById(request.params.id)
    if (!todo) { return response.status(404).end() }

    todo.title = title
    todo.description = description
    todo.remark = remark
    todo.status = status
    todo.categories = categories

    const savedTodo = await todo.save()
    response.json(savedTodo)
})

todosRouter.get('/stats', isAuthenticated, async (request, response) => {
    const user = request.user
    let stats = null
    
    if (user.role === 'admin') {
        stats = await Todo.aggregate(todoStats.adminStatsPipeline())
    } else {
        stats = await Todo.aggregate(todoStats.userStatsPipeline(user._id))
    }

    response.status(200).json(stats)
})  

module.exports = todosRouter
