const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const checkForSession = require('./middlewares/checkForSession');
const swag = require('./controllers/swag_controller');
const auth_controller = require('./controllers/auth_controller');
const cart_controller = require('./controllers/cart_controller');
const search_controller = require('./controllers/search_controller');
require('dotenv').config()

const app = express()
app.use(bodyParser.json())
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET
}))
app.use(checkForSession)
app.use(express.static(`${__dirname}/build`))

app.get('/api/swag', swag.read)
app.post('/api/login', auth_controller.login)
app.post('/api/register', auth_controller.register)
app.post('/api/signout', auth_controller.signout)
app.get('/api/user', auth_controller.getUser)
app.post('/api/cart', cart_controller.add)
app.post('/api/cart/checkout', cart_controller.checkout)
app.delete('/api/cart', cart_controller.delete)
app.get('/api/search', search_controller.search)

app.listen(process.env.SERVER_PORT, () => {
  console.log(`HP20 ${process.env.SERVER_PORT}`)
})