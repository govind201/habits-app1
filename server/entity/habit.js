const { boolean } = require('joi');
const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    createrId: String, 
    content: String, 
    isDone: Boolean, 
    date: Date(),
    type: String,
})

module.export = mongoose.model('habit', habitSchema);