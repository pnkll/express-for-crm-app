const { Schema, model } = require('mongoose')

const Task = new Schema({
    important: { type: Boolean, required: true, default: false },
    theme: { type: String, required: true },
    message: { type: String, required: true },
    maker: {
        id: { type: Schema.Types.ObjectId, ref: 'User' },
        firstname: { type: String },
        lastname: { type: String }
    },
    status: { type: String, default: 'new' },
    respondents: [
        {
            id: { type: Schema.Types.ObjectId, ref: 'User' },
            firstname: { type: String },
            lastname: { type: String }
        }
    ]
})

module.exports = model('Task', Task)