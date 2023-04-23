
const express = require('express')
const parser = require('body-parser')
const cors = require('cors')
const MW = require('./middleware')

const app = express()


app.use(MW.handleManyLangSetting)
app.use(MW.expressjwt)

app.use(parser.urlencoded({ extended: true }))
app.use(parser.json())
app.use(cors())

app.use(MW.requestLog)

app.use('/cms', require('./cms/router/user'))
app.use('/cms', require('./cms/router/role'))
app.use('/cms', require('./cms/router/menu'))
app.use('/cms', require('./cms/router/enumerate'))

app.use('/app', require('./app/router/user'))


// app.use(MW.notFoundRouter)
app.use(MW.handleErrors)

app.listen(80, () => {
    console.log('启动服务器 监听端口')
})

