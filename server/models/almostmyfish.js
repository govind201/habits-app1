const mongoose = require("mongoose");

//define a message schema for the database
const AlmostMyFishSchema = new mongoose.Schema({
    type: String,
    googleid: String,
    price: Number,
});

// compile model from schema
module.exports = mongoose.model("almostmyfish", AlmostMyFishSchema);
