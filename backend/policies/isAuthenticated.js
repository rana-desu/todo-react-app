module.exports = (request, response, next) => {
  const user = request.user

  if (!user) {
    response.status(403).json({
      error: 'You need to login in order to gain access.'
    })
  }

  next()
}