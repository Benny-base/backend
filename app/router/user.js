
const express = require('express')

let router = express.Router()


router.post('/api/v1/user/signIn', (req, res) => {
    // console.log(req.body)
    res.send({message: '登录成功', data: '手机登录成功'})
})


module.exports = router