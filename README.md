# backend

// 静态资源  客户端可直接访问 第一个参数是路径前缀 默认路径是不包括文件夹路径 static('./public') 的 
app.use('/public', express.static('./public'))
app.use('/f', express.static('./files')) // 可以多个静态资源

