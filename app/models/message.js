const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
  text: String,
  order: Number,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  conversation: { type: Schema.Types.ObjectId, ref: 'Conversation' },
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Message', messageSchema)
