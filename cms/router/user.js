
const express = require('express')
const User = require('../controllers/user')
const MW = require('../../middleware')

let router = express.Router()

router.post('/api/v1/user/userInfo', User.userInfo)
router.post('/api/v1/user/signIn', User.signIn)


module.exports = router