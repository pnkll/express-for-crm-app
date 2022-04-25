const { Schema, model } = require('mongoose')

const User = new Schema({
    local: {
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
    },
    info: {
        roles: [{ type: String, ref: 'Role' }],
        firstName: { type: String },
        lastName: { type: String }
    }
})

module.exports = model('User', User)