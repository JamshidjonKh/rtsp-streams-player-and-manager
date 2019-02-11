const express = require('express')
const router = express.Router()
const passport = require('passport')

const genID = require('../helpers/genID')

const User = require('../model/User')

const validateCreatedStreamInput = require('../validation/streams')

router.get(
	'/get',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		res.status(200).json(req.user.streams)
	}
	
)

router.post(
	'/create',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { userID, stream } = req.body
		const { errors, isValid } = validateCreatedStreamInput(stream)

		if(!isValid) return res.status(400).json(errors)

		stream.id = genID()
		User.findOneAndUpdate(
			{ _id: userID },
			{ $push: { "streams" : stream } },
			{ new: true },
			(err, user) => err ? res.status(400).json(err) : res.status(200).json(user.streams)
		)
	}
)

router.post(
	'/remove',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { userID, streamID } = req.body
		User.findOneAndUpdate(
			{ _id: userID },
			{ $pull: { streams: { id: streamID } } },
			{ new: true },
			(err, user) => err ? res.status(400).json(err) : res.status(200).json(user.streams)
		)
	}
)

router.post(
	'/removeAll',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { userID } = req.body
		User.findByIdAndUpdate(
			userID,
			{ $set: { streams: [] } },
			{ new: true },
			(err, user) => err ? res.status(400).json(err) : res.status(200).json(user.streams)
		)
	}
)

router.post(
	'/edit',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { userID, stream } = req.body
		User.updateOne(
			{ _id: userID, "streams.id": stream.id },
			{ $set: { "streams.$": stream } },
			(err, report) => err ? res.status(400).json(err) : null
		)
		User.findById(
			{ _id: userID },
			(err, user) =>{
				err ? res.status(400).json(err) : res.status(200).json(user.streams)
			}
		)
	}
)

module.exports = router;