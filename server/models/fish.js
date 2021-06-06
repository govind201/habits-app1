const mongoose = require("mongoose");

//define a message schema for the database
const AllFishSchema = new mongoose.Schema({
    type: String,
    price: Number,
    name: String,
    isFed: Boolean,
});

// compile model from schema
module.exports  = mongoose.model("allfish", AllFishSchema);