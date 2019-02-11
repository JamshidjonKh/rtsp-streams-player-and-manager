const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const validateRegisterInput = require('../validation/register')
const validateLoginInput = require('../validation/login')

const User = require('../model/User')

router.post('/register', (req, res) => {
	const { errors, isValid } = validateRegisterInput(req.body)
	const { name, email, password } = req.body

	if (!isValid) return res.status(400).json(errors)

	User.findOne({ email }).then(user => {
		if (user) return res.status(400).json(errors)

		const avatar = gravatar.url(email, {
			s: '200',
			r: 'pg',
			d: 'mm',
		})
		const newUser = new User({
			name,
			email,
			password,
			avatar,
		})

		bcrypt.genSalt(10, (err, salt) => {
			if (err) {
				console.error(err)
				return
			}
			bcrypt.hash(newUser.password, salt, (err, hash) => {
				if (err) {
					console.error(err)
					return
				}
				newUser.password = hash
				newUser.save().then(user => res.status(200).json(user))
			})
		})
	})
})

router.post('/login', (req, res) => {
	const { errors, isValid } = validateLoginInput(req.body)
	const { email, password } = req.body

	if (!isValid) return res.status(400).json(errors)

	User.findOne({ email }).then(user => {
		if (!user) {
			errors.email = 'User not found'
			return res.status(404).json(errors)
		}

		bcrypt.compare(password, user.password).then(isMatch => {
			if (!isMatch) {
				errors.password = 'Incorrect password'
				return res.status(400).json(errors)
			}

			const payload = {
				id: user.id,
				name: user.name,
				avatar: user.avatar,
			}

			jwt.sign(payload, 'secret', { expiresIn: 3600 }, (err, token) => {
				if (err) {
					console.error(err)
					return
				}

				res.json({ succes: true, token: `Bearer ${token}` })
			})
		})
		res.status(200)
	})
})

router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
	return res.json({
		id: req.user.id,
		name: req.user.name,
		email: req.user.email,
	})
})

module.exports = router
