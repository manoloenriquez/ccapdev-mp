const createError = require('http-errors')
const express = require('express')
const hbs = require('express-handlebars')
const session = require('express-session')

const indexRoute = require('./routes/index')
const usersRoute = require('./routes/users')
const postsRoute = require('./routes/posts')
const dashboardRoute = require('./routes/dashboard')

const app = express()
const port = 8080

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
  resave: false
}))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('./public'))

// Connect database
require('./model/db').connect()

app.use('/', indexRoute)
app.use('/users', usersRoute)
app.use('/posts', postsRoute)
app.use('/dashboard', dashboardRoute)

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