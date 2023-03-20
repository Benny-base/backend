const { Sequelize } = require('sequelize');

const DB = new Sequelize('test_node', 'root', '123456', {
    // host: 'localhost',
    host: '127.0.0.1',
    dialect: 'mysql',

    timezone: '+08:00',
    logging: false,
    define: {
        freezeTableName: true
    },
    query: { 
        raw: true,       // 全局配置查询返回源数据   (关联查询貌似会出现 result.get is not a function 在该查询语句单独增加配置 raw: true)
    }
})

module.exports = DB
