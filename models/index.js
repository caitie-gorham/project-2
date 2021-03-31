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
    as: 'user_plants'
});

Notes.belongsTo(User, {
    foreignKey: 'user_id'
});

Notes.belongsTo(Plants, {
    foreignKey: 'plants_id'
});

module.exports = { User, Notes, Plants, Join };
