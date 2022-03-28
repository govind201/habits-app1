const mongoose = require("mongoose");

const TutorialSchema = new mongoose.Schema({
    googleid: String,
    done: Boolean,
    //creator_id: String,
    //money: Number,
});

// compile model from schema
module.exports = mongoose.model("tutorial", TutorialSchema);