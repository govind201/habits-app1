const mongoose = require("mongoose");

//define a message schema for the database
const MyFishSchema = new mongoose.Schema({
    type: String,
    googleid: String,
    price: Number,
});

// compile model from schema
module.exports = mongoose.model("myfish", MyFishSchema);
