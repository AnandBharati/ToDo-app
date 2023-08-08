const { Schema, model } = require('mongoose');


const todoSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: String,
    isCompleted: Boolean,
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'auth'
    }
})

module.exports = model('todo',todoSchema);