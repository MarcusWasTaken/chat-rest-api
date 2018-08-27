const mongoose = require('mongoose')
const Message = require('../models/message')

const messageRoute = router => {
  router
    .route('/messages')
    .post((req, res) => {
      const message = new Message({
        _id: new mongoose.Types.ObjectId(),
        text: req.body.text,
        author: req.body.userId,
        conversation: req.body.conversationId
      })
      message.save(
        (err, message) => (err ? res.status(400).send(err) : res.json(message))
      )
    })
    .get((req, res) => {
      Message.find(
        (err, messages) =>
          err ? res.status(400).send(err) : res.json(messages)
      )
    })

  router
    .route('/messages/:id')
    .get((req, res) => {
      Message.findById(
        req.params.id,
        (err, message) => (err ? req.status(400).send(err) : res.json(message))
      )
    })
    .put((req, res) => {
      Message.findById(req.params.id, (err, message) => {
        if (err) {
          res.status(400).send(err)
        } else {
          message.text = req.body.text
          message.save(
            (err, message) =>
              err ? res.status(400).send(err) : res.json(message)
          )
        }
      })
    })
    .delete((req, res) => {
      Message.remove(
        {
          _id: req.params.id
        },
        (err, message) =>
          err ? res.status(400).send(err) : res.send('success!')
      )
    })
}

module.exports = messageRoute
