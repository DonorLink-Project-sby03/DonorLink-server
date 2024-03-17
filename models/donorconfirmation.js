'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DonorConfirmation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DonorConfirmation.belongsTo(models.Donor, {foreignKey: "DonorId"})
    }
  }
  DonorConfirmation.init({
    DonorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Donor Id is required"
        },
        notNull: {
          msg: "Donor Id is required"
        }
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Location is required"
        },
        notNull: {
          msg: "Location is required"
        }
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Image is required"
        },
        notNull: {
          msg: "Image is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'DonorConfirmation',
  });
  return DonorConfirmation;
};