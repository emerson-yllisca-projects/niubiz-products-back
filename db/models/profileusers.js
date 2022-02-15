'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class profileUsers extends Model {

    static associate(models) {
      models.profileUsers.belongsTo(models.users, { foreignKey: 'usuario_id' });
      models.profileUsers.belongsTo(models.profiles, { foreignKey: 'profile_id' });
    }
  }
  profileUsers.init({
    usuario_id: DataTypes.INTEGER,
    profile_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'profileUsers',
  });
  return profileUsers;
};