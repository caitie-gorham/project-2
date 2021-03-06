const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Plants extends Model {
    
}

Plants.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    url: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    scientific_name: {
        type: DataTypes.STRING(1000),
        allowNull: false,
    },
    sunlight_care: {
        type: DataTypes.STRING(1000),
        allowNull: false,
    },
    indoor: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    watering_tips: {
        type: DataTypes.STRING(1000),
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
