'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Recipient.init({
    UserId: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    location: DataTypes.STRING,
    image: DataTypes.STRING,
    bloodType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Recipient',
  });
  return Recipient;
};