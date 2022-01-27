const mongoose = require("mongoose");

const TodayFishSchema = new mongoose.Schema({
    fishes: [Object],
    date: String 
});

module.exports = mongoose.model("todayfish", TodayFishSchema);