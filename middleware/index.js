const { expressjwt } = require('express-jwt')
const { privateKey, manyLangConfig } = require('../config')
const Errors = require('../customErrors')
const _ = require('lodash')
const Validator = require('validatorjs')
const dayjs = require('dayjs')


// 如果是app端token访问cms接口  吊销token
const isRevokedCallback = (req, token) => {
    const platform = req.url.split('/')[1]
    const { role } = token.payload
    let bool = false
    if(platform == 'cms' && role == 10) bool = true
    return bool
}

// 解析token
// unless({path: []}) 填写不需要验证的router
// jwt中间件自动验证token 在req.auth中获取token解析数据
exports.expressjwt = expressjwt(
    { secret: privateKey, algorithms: ['HS256'], isRevoked: isRevokedCallback })
    .unless({
        path: [
            '/cms/api/v1/user/signIn',
            
            '/app/api/v1/user/signIn',
        ]
    }
)

// 处理错误
exports.handleErrors = (err, req, res, next) => {
    if (err.name == "UnauthorizedError") res.send({ code: 1000, message: "invalid token..." })      // 第三方库的Error
    else if (_.has(Errors, err.name)) res.send({ code: err.code, message: err.message })         // 自定义错误
    else res.send({ code: 3000, message: err.message || '未知错误...' })
}

// 需要超管权限
exports.needSuperManager = (req, res, next) => {
    if(req.auth.role != 'super') return next(new Errors.PermissionDenied())
    next()
}

// 找不到路由
exports.notFoundRouter = (req, res, next) => {
    next(new Errors.NotFoundRouter())
}

// 处理第三方库的语言设置
exports.handleManyLangSetting = (req, res, next) => {
    if(_.has(manyLangConfig, req.headers.lang)){
        Validator.useLang(manyLangConfig[req.headers.lang].valid)
    }
    next()
}

// request log
exports.requestLog = (req, res, next) => {
    const requestURL = `${req.protocol}://${req.get('host')+req.originalUrl}`
    console.log(`\n\nDate: ${ dayjs().format('YYYY-MM-DD H:mm:ss') }\nAPI: ${requestURL}\nParams: ${ JSON.stringify(req.body) }`)
    next()
}