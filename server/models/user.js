const mongoose  = require('mongoose');

const userSchema = new mongoose.Schema({
    user: String,
    googleId: String,
})

module.exports = mongoose.model("user",userSchema);
