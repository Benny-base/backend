
const Errors = require('../../customErrors');
const User = require('../models/user');
const bcryptjs = require('bcryptjs')
const { success, jwtSign, encryptPwd, validForm } = require('../../utils')

exports.signIn = async(req, res, next) => {
    try {
        const isFail = validForm(req.body, {
            username: 'required',
            password: 'required|min:6',
        }, next)
        if(isFail) return

        const userData = await User.findOne({ where: { username: req.body.username } })
        if (!userData) return next(new Errors.AccountNotSignUp())
    
        if(!bcryptjs.compareSync(req.body.password, userData.password)) return next(new Errors.AccountOrPwd())
    
        const data = {
            ...userData.dataValues,
            token: jwtSign(userData.dataValues)
        }
        res.send({ ...success, data })
    } catch (err) {
        next(err)
    }
}

exports.addManager = async(req, res, next) => {
    try {
        const isFail = validForm(req.body, {
            username: 'required',
            password: 'required|min:6',
        }, next)
        if(isFail) return
        
        const [user, created] = await User.findOrCreate({ 
            where: { username: req.body.username },
            defaults: {
                username: req.body.username,
                password: encryptPwd(req.body.password),
                role: 2
            }
        })
        if(!created) return next(new Errors.AccountExists())
    
        res.send(success)
    } catch (err) {
        next(err)
    }
}
