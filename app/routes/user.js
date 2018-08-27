const mongoose = require('mongoose')
const User = require('../models/user')
const Message = require('../models/message')
const Conversation = require('../models/conversation')

const userRoute = router => {
  router
    .route('/users')
    .post((req, res) => {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name
      })

      user.save(
        (err, user) => (err ? res.status(400).send(err) : res.json(user))
      )
    })
    .get((req, res) => {
      User.find(
        (err, users) => (err ? res.status(400).send(err) : res.json(users))
      )
    })

  router
    .route('/users/:id')
    .get((req, res) => {
      User.findById(
        req.params.id,
        (err, user) => (err ? req.status(400).send(err) : res.json(user))
      )
    })
    .put((req, res) => {
      User.findById(req.params.id, (err, message) => {
        if (err) {
          res.status(400).send(err)
        } else {
          user.name = req.body.name
          user.save(
            (err, user) => (err ? res.status(400).send(err) : res.json(user))
          )
        }
      })
    })
    .delete((req, res) => {
      User.remove(
        {
          _id: req.params.id
        },
        (err, user) => (err ? res.status(400).send(err) : res.send('success!'))
      )
    })

  router.route('/users/:id/messages').get((req, res) => {
    Message.find(
      { author: req.params.id },
      (err, messages) => (err ? res.status(400).send(err) : res.json(messages))
    )
  })

  router.route('/users/:id/conversations').get((req, res) => {
    Conversation.find(
      { members: req.params.id },
      (err, conversations) =>
        err ? res.status(400).send(err) : res.json(conversations)
    )
  })
}

module.exports = userRoute
