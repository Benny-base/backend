const DB = require('../../DB');
const { DataTypes } = require('sequelize');

module.exports = DB.define('enumerates', {
    parent_key: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    key: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    label: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sort: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
},{
    createdAt: true,
    updatedAt: true,
});

