module.exports = (request, response, next) => {
  const user = request.user

  if (user && user.role === 'admin') {
    return next()
  }

  return response.status(403).json({
    error: 'Admin only access.'
  })
}