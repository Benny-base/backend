
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
        const isFail = validForm(req.body, {
            name: 'required',
            key: 'required',
        }, next)
        if(isFail) return
        
        const { name, key, remark, menus } = req.body
        const [row, created] = await Role.findOrCreate({ 
            where: { key },
            defaults: {
                name, key, remark, menus
            }
        })
        if(!created) return next(new Errors.KeyExists())

        res.send({ ...success })
    } catch (err) {
        next(err)
    }
}

