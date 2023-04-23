
const express = require('express')
const Enumerate = require('../controllers/enumerate')
const MW = require('../../middleware')

let router = express.Router()

router.post('/api/v1/emun/emunList', Enumerate.emunList)


module.exports = router