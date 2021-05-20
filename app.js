const createError = require('http-errors')
const express = require('express')
const hbs = require('express-handlebars')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const indexRoute = require('./routes/index')
const userRoute = require('./routes/user')
const postRoute = require('./routes/post')
const dashboardRoute = require('./routes/dashboard')
const searchRoute = require('./routes/search')

require('dotenv').config()

const app = express()
const port = process.env.PORT

app.listen(port, () => console.log(`Server running on port ${port}`))

// view engine setup
app.engine('hbs', hbs({
  extname: 'hbs',
}))
// app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

// session setup
app.use(session({
  secret: 'ccapdev-mp-session',
  name: 'uniqueSessionID',
  saveUninitialized: false,
  resave: false,
  store: MongoStore.create({
    mongoUrl: process.env.DB_URL
  })
}))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('./public'))

// Connect database
require('./model/db').connect()

app.use('/', indexRoute)
app.use('/user', userRoute)
app.use('/post', postRoute)
app.use('/dashboard', dashboardRoute)
app.use('/search', searchRoute)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error', { loggedIn: req.session.loggedIn })
})