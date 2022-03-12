const mongoose = require("mongoose");

//define a message schema for the database
const DeadFishSchema = new mongoose.Schema({
    type: String,
    googleid: String,
    timestamp: Date,
});

// compile model from schema
module.exports = mongoose.model("deadfish", DeadFishSchema);