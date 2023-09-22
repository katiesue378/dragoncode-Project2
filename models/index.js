const User = require('./User');
const Bucketlist = require('./Bucketlist');

User.hasMany(Bucketlist, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Bucketlist.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Bucketlist };