const sequelize = require('../config/connection');
const { User, Bucketlist } = require('../models');

const userData = require('./userData.json');
const bucketlistData = require('./bucketlistData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const bucketlist of bucketlistData) {
    await Bucketlist.create({
      ...bucketlist,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();