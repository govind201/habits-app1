const mongoose = require("mongoose");

const AllFishSchema = new mongoose.Schema({
    type: String,
    price: Number,
    name: String,
    lastFed: Date,
    isFed: Boolean,
    
});

module.exports  = mongoose.model("allfish", AllFishSchema);
