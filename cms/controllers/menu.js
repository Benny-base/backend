
const Errors = require('../../customErrors');
const Menu = require('../models/menu');
const { success, validForm } = require('../../utils')
const { Op } = require("sequelize");
const _ = require('lodash')

exports.menusList = async(req, res, next) => {
    try {
        const { pageIndex = 1, limit = 10 } = req.body
        let list = await Menu.findAll({ where: { parent_key: { [Op.eq]: '' } }, offset: pageIndex-1, limit, order: [['sort','asc']] });
        
        const childList = await Menu.findAll({ where: { parent_key: { [Op.not]: '' } }, order: [['sort','asc']] });

        _.forIn(_.groupBy(childList, 'parent_key'), (val, key) => {
            list = list.map(item => {
                if(item.key == key){
                    item.children = val
                }
                return item
            })
        })
        const data = { list }
        res.send({ ...success, data })
    } catch (err) {
        next(err)
    }
}

exports.addmenu = async(req, res, next) => {
    try {
        const isFail = validForm(req.body, {
            key: 'required',
            label: 'required',
        }, next)
        if(isFail) return

        const { parent_key, key, label, component, sort } = req.body
        const [menu, created] = await Menu.findOrCreate({
            where: { key },
            defaults: { parent_key, key, label, component, sort }
        })
        if(!created) return next(new Errors.KeyExists())
        res.send({ ...success })

    } catch (err) {
        next(err)
    }
}

exports.menuKeys = async(req, res, next) => {
    try {
        const list = await Menu.findAll({ where: { parent_key: { [Op.eq]: '' } }, order: [['sort','asc']] });
        const data = { list }
        res.send({ ...success, data })
    } catch (err) {
        next(err)
    }
}



