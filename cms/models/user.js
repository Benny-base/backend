const DB = require('../../DB');
const { DataTypes } = require('sequelize');

module.exports = DB.define('users', {
    username: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    role: {
        type: DataTypes.NUMBER,
    }
},{
    // 这是其他模型参数
    createdAt: true,
    updatedAt: true
});

