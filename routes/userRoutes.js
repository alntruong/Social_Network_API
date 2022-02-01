const router = require('express').Router()
const { User, Thought } = require('../models')
const passport = require('passport')
const jwt = require('jsonwebtoken')

// Register user
router.post('/users/register', (req, res) => {
 const { username, email } = req.body
 User.register(new User({ username, email }), req.body.password, err => {
  if (err) { console.log(err) }
  res.sendStatus(200)
 })
})

// Login user with authentication
router.post('/users/login', (req, res) => {
 const { username } = req.body
 User.authenticate()(username, req.body.password, (err, user) => {
  if (err) { console.log(err) }
  res.json(user ? jwt.sign({ id: user._id }, process.env.SECRET) : null)
 })
})

// get users profile
router.get('/users/profile', passport.authenticate('jwt'), (req, res) => res.json(req.user))

// get all users
router.get('/users', passport.authenticate('jwt'), async function (req, res) {
 const user = await User.find({}).populate('thought')
 res.json(user)
})

// get one users
router.get('/users/:id', passport.authenticate('jwt'), async function (req, res) {
 const user = await User.findById(req.params.id).populate('thought')
 res.json(user)
})

// edit one profile
router.put('/users/:id', passport.authenticate('jwt'), async function (req, res) {
 const user = await User.findByIdAndUpdate(req.params.id)
 res.json(user)
})

// delete one user
router.delete('/users/:id', passport.authenticate('jwt'), async function (req, res) {
 const user = await User.findByIdAndDelete(req.params.id)
 res.sendStatus(200)
})

// add a friend
router.post('/user/:userId/friend/:friendId', passport.authenticate('jwt'), async function (req, res) {
 const friend = await User.findByIdAndUpdate(req.params.userId, { $addToSet: { friends: req.params.friendId } })
 const friend2 = await User.findByIdAndUpdate(req.params.friendId, { $addToSet: { friends: req.params.userId } })
 res.sendStatus(200)
})


// delete a friend
router.delete('/user/:userId/friend/:friendId', passport.authenticate('jwt'), async function (req, res) {
 const friend = await User.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } })
 const friend2 = await User.findByIdAndUpdate(req.params.friendId, { $pull: { friends: req.params.userId } })
 res.sendStatus(200)
})



module.exports = router