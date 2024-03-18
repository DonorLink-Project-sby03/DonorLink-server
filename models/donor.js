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
    }
  }
  Donor.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "User Id is required"
        },
        notNull: {
          msg: "User Id is required"
        }
      }
    },
    RecipientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Recipient Id is required"
        },
        notNull: {
          msg: "Recipient Id is required"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Stock Id is required"
        },
        notNull: {
          msg: "Stock Id is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Donor',
  });
  return Donor;
};