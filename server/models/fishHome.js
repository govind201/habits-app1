const mongoose = require('mongoose');

const fishHomeSchema = new mongoose.Schema({
    fishes: [Object],
})