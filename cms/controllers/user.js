
const Errors = require('../../customErrors');
const User = require('../models/user');
const Menu = require('../models/menu');
const Role = require('../models/role');
const bcryptjs = require('bcryptjs')
const Seq = require('sequelize')
const { success, jwtSign, validForm } = require('../../utils')

exports.userInfo = async(req, res, next) => {
    try {
        const userData = await User.findByPk(req.auth.id , {
            raw: true,
            include: { model: Role, attributes: [] },
            attributes: { include: [[Seq.col('role.menus'), 'routes']]}
        })
        if (!userData) return next(new Errors.AccountNotSignUp())
        
        if(req.auth.role_id == 1){
            const routelist = await Menu.findAll()
            userData.routes = routelist.map(item => item.key)
        }

        const data = { ...userData }
        res.send({ ...success, data })
    } catch (err) {
        next(err)
    }
}

exports.signIn = async(req, res, next) => {
    try {
        validForm(req.body, {
            username: 'required',
            password: 'required|min:6',
        })

        const userData = await User.findOne({ 
            where: { username: req.body.username }, 
            raw: true,
            include: { model: Role, attributes: [] },
            attributes: { include: [[Seq.col('role.menus'), 'routes']]}
        })

        if (!userData) return next(new Errors.AccountNotSignUp())
        if(!bcryptjs.compareSync(req.body.password, userData.password)) return next(new Errors.AccountOrPwd())
    
        if(userData.role_id == 1){
            const routelist = await Menu.findAll()
            userData.routes = routelist.map(item => item.key)
        }

        const data = {
            ...userData,
            token: jwtSign(userData)
        }
        res.send({ ...success, data })
    } catch (err) {
        next(err)
    }
}
