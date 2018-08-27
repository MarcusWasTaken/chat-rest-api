require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const userRoute = require('./app/routes/user')
const conversationRoute = require('./app/routes/conversation')
const messageRoute = require('./app/routes/message')

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

messageRoute(router)
userRoute(router)
conversationRoute(router)

app.listen(port)
console.log(`Server running on port ${port}`)
