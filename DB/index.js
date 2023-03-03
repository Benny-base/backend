const { Sequelize } = require('sequelize');

const DB = new Sequelize('test_node', 'root', '123456', {
    // host: 'localhost',
    host: '127.0.0.1',
    dialect: 'mysql',

    timezone: '+08:00',
    define: {
        freezeTableName: true
    }
})

module.exports = DB
