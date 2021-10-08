const mongoose = require('mongoose');

const fishHouseSchema = new mongoose.Schema({
    fishes: [Object],
    date: String
})
    
module.exports = mongoose.model('fishHome',fishHouseSchema)