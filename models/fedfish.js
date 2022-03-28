const mongoose = require("mongoose");

const FedFishSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  lastfed: Date,
});

// compile model from schema
module.exports = mongoose.model("fedfish", FedFishSchema);