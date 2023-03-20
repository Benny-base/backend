const DB = require('../../DB');
const { DataTypes } = require('sequelize');
const Role = require('./role');

const model = DB.define('users', {
    username: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    role_id: {
        type: DataTypes.INTEGER,
    },
},{
    // 这是其他模型参数
    createdAt: true,
    updatedAt: true
});

model.hasOne(Role, { foreignKey: 'id' })

module.exports = model