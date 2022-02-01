const router = require('express').Router()
const { Thought, User } = require('../models')
const passport = require('passport')

// get all thought
router.get('/thoughts', passport.authenticate('jwt'), async function (req, res) {
 const thoughts = await Thought.find({}).populate('user')
 res.json(thoughts)
})

// get one thought
router.get('/thoughts/:id', passport.authenticate('jwt'), async function (req, res) {
 const thoughts = await Thought.findById(req.params.id).populate('user').populate('notes')
 res.json(thoughts)
})

// CREATE one  thought
router.post('/thoughts', passport.authenticate('jwt'), async function (req, res) {
 const thought = await Thought.create({ ...req.body, user: req.user._id })
 await User.findByIdAndUpdate(req.user._id, { $push: { thoughts: thought._id } })
 res.json(thought)
})

// UPDATE one thought
router.put('/thoughts/:id', passport.authenticate('jwt'), async function (req, res) {
 await Thought.findByIdAndUpdate(req.params.id, { $set: req.body })
 res.sendStatus(200)
})


// DELETE one thought
router.delete('/thoughts/:id', passport.authenticate('jwt'), async function (req, res) {
 await Thought.findOneAndDelete(req.params.id)
 res.sendStatus(200)
})

module.exports = router