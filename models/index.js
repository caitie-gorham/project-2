const User = require('./User');
const Plants = require('./Plants');
const Notes = require('./Notes');
const Greenhouse = require('./Greenhouse');

Plants.belongsToMany(User, {
    through: {
        model: Greenhouse,
        unique: false
    },
    as: "greenhouse_table"
});

User.belongsToMany(Plants, {
    through: {
        model: Greenhouse,
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

module.exports = { User, Notes, Plants, Greenhouse };
