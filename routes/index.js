const router = require('express').Router()

router.use('/api', require('./userRoutes.js'))
router.use('/api', require('./thoughtRoutes.js'))
router.use('/api', require('./noteRoutes.js'))

module.exports = router