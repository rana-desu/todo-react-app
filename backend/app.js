const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const todosRouter = require('./controllers/todos')
const middleware = require('./utils/middleware')
const config = require('./utils/config')
const logger = require('./utils/logger')

const app = express()

logger.info('attempting connection to:', config.MONGODB_URI)

mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB.')
    })
    .catch(error => {
        logger.error('error connecting to MongoDB:', error.message)
    })

app.use(express.json())
app.use(cors())

app.use(middleware.requestLogger)
app.use('/api/todos', todosRouter)

app.use(middleware.unkownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
