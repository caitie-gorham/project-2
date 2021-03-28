const User = require('./User');
const Plants = require('./Plants');
const Notes = require('./Notes');
const Join = require('./Join');

Plants.belongsToMany(User, {
    through: {
        model: Join,
        unique: false
    },
    as: "join_table"
});

User.belongsToMany(Plants, {
    through: {
        model: Join,
        unique: false
    },
    as: 'table_join'
});

Notes.belongsTo(User, {
    foreignKey: 'user_id'
});

Notes.belongsTo(Plants, {
    foreignKey: 'plant_id'
});

module.exports = { User, Notes, Plants, Join };
