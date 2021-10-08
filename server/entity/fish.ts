const mongoose = require("mongoose");

const AllFishSchema = new mongoose.Schema({
    type: String,
    price: Number,
    name: String,
});

module.exports  = mongoose.model("allfish", AllFishSchema);
