
const express = require('express')
const Menu = require('../controllers/menu')
const MW = require('../../middleware')

let router = express.Router()

router.post('/api/v1/menus/menusList', Menu.menusList)
router.post('/api/v1/menus/addmenu', Menu.addmenu)
router.post('/api/v1/menus/menuKeys', Menu.menuKeys)


module.exports = router