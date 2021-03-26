const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Join extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

//CHANGE THIS MODEL.
//Do you want to track your users by first name AND last name?
//Do you want a username column in addition to email?
//Is there anything else about your user your application requires you to keep track of?
Join.init( {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      plants_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'plants',
          key: 'id',
          unique: false
        }
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
          unique: false
        }
      },
    

  
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'join',
}
);
module.exports = Join;
