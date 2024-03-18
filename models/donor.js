'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Donor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Donor.belongsTo(models.Recipient, {foreignKey: "RecipientId"})
      Donor.hasOne(models.DonorConfirmation, {foreignKey: "DonorId"})
      Donor.belongsTo(models.User, {foreignKey: "UserId"})
    }
  }
  Donor.init({
    UserId: DataTypes.INTEGER,
    RecipientId: DataTypes.INTEGER,
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Stock is required"
        },
        notNull: {
          msg: "Stock is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Donor',
  });
  return Donor;
};