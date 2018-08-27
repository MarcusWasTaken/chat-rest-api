const mongoose = require('mongoose')
const Schema = mongoose.Schema

const conversationSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  latest: { type: Number, default: 0 },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Conversation', conversationSchema)
