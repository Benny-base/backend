
const express = require('express')
const User = require('../controllers/user')
const MW = require('../../middleware')

let router = express.Router()


router.post('/api/v1/user/signIn', User.signIn)
router.post('/api/v1/user/addManager', [MW.isSuperManager], User.addManager)


module.exports = router