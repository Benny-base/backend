const DB = require('../../DB');
const { DataTypes } = require('sequelize');

module.exports = DB.define('roles', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    remark: {
        type: DataTypes.STRING,
    },
    menus: {
        type: DataTypes.STRING,
        get: function() {
            return JSON.parse(this.getDataValue('menus'));
        },
        set: function(val) {
            return this.setDataValue('menus', JSON.stringify(val));
        },
    }
},{
    // 这是其他模型参数
    createdAt: true,
    updatedAt: true,
});

