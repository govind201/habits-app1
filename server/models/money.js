const mongoose = require('mongoose');

const moneySchema = new mongoose.Schema({
    googleId: String,
    money: Number
}) 

module.exports = mongoose.model('money', moneySchema)
    