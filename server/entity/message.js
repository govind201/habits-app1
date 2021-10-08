const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    sender: String,
    recipient: String,
    date: {type: Date, default: Date.now()},
    content: String 
})

module.exports = mongoose.model('message', messageSchema);