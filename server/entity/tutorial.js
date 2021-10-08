const mongoose = require('mongoose');

const tutorialSchema = new mongoose.Schema({
    googleId = String,
    isDone: Boolean
})

module.exports = mongoose.model('tutorial', tutorialSchema)