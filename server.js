const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const path = require('path')
const db = require('./db');
const users = require('./routes/user')
const streams = require('./routes/streams')
const rtsp = require('./routes/rtsp')

mongoose
	.connect(
		db.DB,
		{ useNewUrlParser: true }
	)
	.then(() => {
		console.log('Database is connected')
	})
	.catch(err => {
		console.log('Can not connect to the database:', err)
	})

const app = express()

app.use(passport.initialize())
require('./passport')(passport)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, '/public')))

// Routes
app.use('/api/users', users)
app.use('/api/streams', streams)
app.use('/api/rtsp', rtsp)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
	console.log(`Server is running on PORT ${PORT}`)
})


