const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Greenhouse extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

Greenhouse.init( {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      plant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'plants',
          key: 'id',
          unique: false
        }
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
          unique: false
        }
      },
      //BONUS TURF
      //add a 'beforeCreate' hook that checks our greenhouse table
      // to see if we already have a record with the current combo of user_id / plant_id
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'greenhouse',
}
);
module.exports = Greenhouse;
