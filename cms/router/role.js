
const express = require('express')
const Role = require('../controllers/role')
const MW = require('../../middleware')

let router = express.Router()

router.post('/api/v1/role/roleList', Role.roleList)
router.post('/api/v1/role/addRole', Role.addRole)


module.exports = router