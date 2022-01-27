const mongoose = require("mongoose");

const TutorialSchema = new mongoose.Schema({
    googleid: String,
    done: Boolean,
});

module.exports = mongoose.model("tutorial", TutorialSchema);