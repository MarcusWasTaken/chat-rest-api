require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Bear = require('./app/models/bear')

const app = express()
const router = express.Router()
const port = process.env.PORT || 8100

mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true }
)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/api', router)

router.use((req, res, next) => {
  console.log('request was made')
  next()
})

router.get('/', (req, res) => {
  res.json({ message: 'hello world!' })
})

router
  .route('/bears')
  .post((req, res) => {
    let bear = new Bear()
    bear.name = req.body.name
    bear.save((err, bear) => (err ? res.status(400).send(err) : res.json(bear)))
  })
  .get((req, res) => {
    Bear.find(
      (err, bears) => (err ? res.status(400).send(err) : res.json(bears))
    )
  })

router
  .route('/bears/:id')
  .get((req, res) => {
    Bear.findById(
      req.params.id,
      (err, bear) => (err ? res.status(400).send(err) : res.json(bear))
    )
  })
  .put((req, res) => {
    Bear.findById(req.params.id, (err, bear) => {
      if (err) {
        res.status(400).send(err)
      } else {
        bear.name = req.body.name
        bear.save(
          (err, bear) => (err ? res.status(400).send(err) : res.json(bear))
        )
      }
    })
  })
  .delete((req, res) => {
    Bear.remove(
      {
        _id: req.params.id
      },
      (err, bear) =>
        err ? res.status(400).send(err) : res.json({ message: 'success!' })
    )
  })

app.listen(port)
console.log(`Server running on port ${port}`)
