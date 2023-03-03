const jwt = require('jsonwebtoken')
const { privateKey } = require('../config')
const bcryptjs = require('bcryptjs')
const Validator = require('validatorjs')
const Errors = require('../customErrors');

// 响应格式
exports.success = { data: {}, code: 0, message: '请求成功' }

// token生成    expiresIn: '5h'  h小时 / s秒 
exports.jwtSign = (user) => {
    return jwt.sign(user, privateKey, { expiresIn: `${ 1*24 }h` })
}

// 密码加密
exports.encryptPwd = (password) => {
    return bcryptjs.hashSync(password, 10)
}

// 获取第一条错误信息
exports.getFirstErrMsg = (obj) => {
    return Object.entries(obj)[0]?.[1]
}

// 表单验证 返回是否失败
exports.validForm = (data, rules, next) => {
    let v = new Validator(data, rules)
    if(v.fails()){
        next(new Errors.FormValidate(this.getFirstErrMsg(v.errors.all())))
        return true
    }
}


