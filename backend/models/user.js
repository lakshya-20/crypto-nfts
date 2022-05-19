const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  public_address: {
    type: String,
    unique: true,
    required: true
  },
  nonce: {
    type: Number,
    default: Math.floor(Math.random() * 1000000)
  }
})
module.exports = mongoose.model("user", userSchema);