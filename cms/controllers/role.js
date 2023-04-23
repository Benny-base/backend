
const Errors = require('../../customErrors');
const Role = require('../models/role');
const { success, validForm } = require('../../utils')

exports.roleList = async(req, res, next) => {
    try {
        const { pageIndex = 1, limit = 10 } = req.body
        const list = await Role.findAll({ offset: pageIndex - 1 , limit });

        const data = {
            list
        }
        res.send({ ...success, data})
    } catch (err) {
        next(err)
    }
}

exports.addRole = async(req, res, next) => {
    try {
        validForm(req.body, {
            name: 'required',
        })
        const { name, remark, menus } = req.body
        const row = await Role.create({ name, remark, menus })

        res.send({ ...success })
    } catch (err) {
        next(err)
    }
}

