const mongoose = require("mongoose");

const NameSchema = new mongoose.Schema({
    // googleid: String,
    creator_id: String,
    name: String,
});

// compile model from schema
module.exports = mongoose.model("name", NameSchema);