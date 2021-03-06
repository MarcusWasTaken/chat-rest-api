const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('User', userSchema)
