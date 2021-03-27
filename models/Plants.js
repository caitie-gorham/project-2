const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Plants extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

Plants.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    scientific_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sunlight_care: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    indoor: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    watering_tips: {
        type: DataTypes.STRING,
        allowNull: false,
    },




},
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'plants',
    }
);
module.exports = Plants;
