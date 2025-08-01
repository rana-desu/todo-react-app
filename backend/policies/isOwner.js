const Todo = require('../models/todo')

module.exports = async (request, response, next) => {
  console.log('this is the user in isOwner: ', request.user)
  const user = request.user
  const todoId = request.params.id

  const todo = await Todo.findById(todoId)

  if (!user) { response.status(403).json({ error: 'User not found.'}) }

  if (user?.role === 'user' && user._id?.toString() !== todo.user.toString()) {
    return response
      .status(403)
      .json({
        error: 'Unauthorized access, content not owned by the logged in user.'
      })
  }

  next()
}