
const Errors = require('../../customErrors');
const { success, validForm } = require('../../utils')
const Enumerate = require('../models/enumerate');
const { Op } = require("sequelize");
const _ = require('lodash')

exports.emunList = async(req, res, next) => {
    try {
        const { pageIndex = 1, limit = 10 } = req.body
        let { count, rows } = await Enumerate.findAndCountAll({ where: { parent_key: { [Op.eq]: '' } }, offset: pageIndex-1, limit, order: [['sort','asc']] });

        const data = { list: rows, total: count  }
        res.send({ ...success, data })
    } catch (err) {
        next(err)
    }
}


