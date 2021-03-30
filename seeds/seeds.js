const sequelize = require('../config/connection');
const { User, Plants, Join, Notes } = require('../models');

const UserSeedData = require('../seeds/user.json');
const PlantsSeedData = require('../seeds/plants.json');
const NotesSeedData = require('../seeds/notes.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const Users = await User.bulkCreate(UserSeedData);
  
  const PlantVar = await Plants.bulkCreate(PlantsSeedData);

  // Create one record at random
  for (let i = 0; i < 10; i++) {
    // Get a random User's `id`
    const { id: randomUserId } = Users[
      Math.floor(Math.random() * Users.length)
    ];

    // Get a random Plants's `id`
    const { id: randomPlantsId } = PlantVar[
      Math.floor(Math.random() * PlantVar.length)
    ];

    // Create a new Notes with random `Notes_budget` and `User_amount` values, but with ids selected above
    await Join.create({
      // Notes_budget: (Math.random() * 10000 + 1000).toFixed(2),
      // User_amount: Math.floor(Math.random() * 10) + 1,
      user_id: randomUserId,
      plant_id: randomPlantsId
    }).catch((err) => {
      // If there's an error, such as the same random pairing of `User.id` and `location.id` occurring and we get a constraint error, don't quit the Node process
      console.log(err);
    });
  }
  const Notation = await Notes.bulkCreate(NotesSeedData);
  process.exit(0);
};

seedDatabase();
