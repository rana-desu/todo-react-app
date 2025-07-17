const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('todos', {
      title: 1,
      description: 1,
      status: 1,
      categories: 1,
      createdAt: 1,
    })

  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!username || !password) {
    return response
      .status(400)
      .json({
        error: 'Username or password is missing.'
      })
  }

  if (username.length < 3 || username.length > 30) {
    return response.status(400).json({
      error: 'Username must be in the range of 3 to 30 characters.'
    })
  }

  if (password.length < 3 || password.length > 50) {
    return response
      .status(400)
      .json({
        error: 'Password must be in the range of 3 to 50 characters'
      })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

module.exports = usersRouter