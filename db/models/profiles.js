'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class profiles extends Model {
    
    static associate(models) {
      // define association here
    }
  }
  profiles.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'profiles',
    tableName: 'profiles',
  });
  return profiles;
};