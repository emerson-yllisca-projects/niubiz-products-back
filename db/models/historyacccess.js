'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class historyAcccess extends Model {

    static associate(models) {
      // define association here
    }
  }
  historyAcccess.init({
    usuario_id: DataTypes.INTEGER,
    token: DataTypes.STRING,
    estado: DataTypes.INTEGER,
    fecha: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'historyAcccess',
  });
  return historyAcccess;
};