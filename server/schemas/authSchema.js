const { Schema, model } = require('mongoose')

const authSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: String,
    password: String,
})

module.exports = model('auth', authSchema);