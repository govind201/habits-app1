const mongoose = require('mongoose');

const fishHouseSchema = new mongoose.Schema({
    fishes: [Object],
})
    
module.exports = mongoose.model('fishHome',fishHouseSchema)