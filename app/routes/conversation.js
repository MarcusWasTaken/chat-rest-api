const mongoose = require('mongoose')
const Conversation = require('../models/conversation')
const Message = require('../models/message')

const conversationRoute = router => {
  router
    .route('/conversations')
    .post((req, res) => {
      const conversation = new Conversation({
        _id: new mongoose.Types.ObjectId(),
        members: JSON.parse(req.body.userIds)
      })

      conversation.save(
        (err, conversation) =>
          err ? res.status(400).send(err) : res.json(conversation)
      )
    })
    .get((req, res) => {
      Conversation.find(
        (err, conversations) =>
          err ? res.status(400).send(err) : res.json(conversations)
      )
    })

  router
    .route('/conversations/:id')
    .get((req, res) => {
      Conversation.findById(
        req.params.id,
        (err, conversation) =>
          err ? req.status(400).send(err) : res.json(conversation)
      )
    })
    .delete((req, res) => {
      Conversation.remove(
        {
          _id: req.params.id
        },
        err => (err ? res.status(400).send(err) : res.send('success!'))
      )
    })

  router.route('/conversations/:id/messages').get((req, res) => {
    Message.find(
      { conversation: req.params.id },
      (err, messages) => (err ? req.status(400).send(err) : res.json(messages))
    )
  })

  router
    .route('/conversations/:id/members')
    .put((req, res) => {
      Conversation.findById(req.params.id, (err, conversation) => {
        if (err) {
          res.status(400).send(err)
        } else {
          conversation.members.push(req.body.userId)
          conversation.save(
            (err, conversation) =>
              err ? res.status(400).send(err) : res.json(conversation)
          )
        }
      })
    })
    .delete((req, res) => {
      Conversation.findById(req.params.id, (err, conversation) => {
        if (err) {
          res.status(400).send(err)
        } else {
          conversation.members.remove(req.body.userId)
          conversation.save(
            (err, conversation) =>
              err ? res.status(400).send(err) : res.json(conversation)
          )
        }
      })
    })
}

module.exports = conversationRoute
