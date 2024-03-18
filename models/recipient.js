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
      Recipient.belongsTo(models.User, {foreignKey: "UserId"})
      Recipient.hasMany(models.Donor, {foreignKey: "RecipientId"})
    }
  }
  Recipient.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "User id is required"
        },
        notNull: {
          msg: "User id is required"
        }
      }
    },
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
    image: DataTypes.STRING,
    bloodType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Blood type is required"
        },
        notNull: {
          msg: "Blood type is required"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Description is required"
        },
        notNull: {
          msg: "Description is required"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Recipient',
  });
  return Recipient;
};