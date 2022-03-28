const mongoose = require("mongoose");

const TodayFishSchema = new mongoose.Schema({
    fishes: [Object],
    date: String //hack, 20200120
});

// compile model from schema
module.exports = mongoose.model("todayfish", TodayFishSchema);