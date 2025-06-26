const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        minLength: 5,
        maxLength: 50,
        required: true,
    },
    description: String,
    remark: String,
    status: {
        type: String,
        default: "pending",
    },
    categories: {
        type: Object,
        default: {
            work: false,
            home: false,
            chore: false,
        }
    },
    overdue: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

todoSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()

        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Todo', todoSchema)