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
        enum: [
            'pending', 
            'in-progress', 
            'on-hold', 
            'completed', 
            'rejected'
        ],
        default: 'pending',
    },
    categories: {
        type: [String],
        enum: ['work', 'personal', 'chores'],
        default: [],
        required: true,
        validate: {
            validator: (val) => Array.isArray(val) && val.length > 0,
            message: 'at least provide with one category for the TODO.'
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