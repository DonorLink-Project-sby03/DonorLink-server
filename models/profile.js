'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Profile.belongsTo(models.User, { foreignKey:"UserId" })
    }
  }
  Profile.init({
    UserId: DataTypes.INTEGER,
    identityNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Identity Number is required"
        },
        notNull: {
          msg: "Identity Number is required"
        }
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Gender is required"
        },
        notNull: {
          msg: "Gender is required"
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Address is required"
        },
        notNull: {
          msg: "Address is required"
        }
      }
    },
    job: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Job is required"
        },
        notNull: {
          msg: "Job is required"
        }
      }
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Date Of Birth is required"
        },
        notNull: {
          msg: "Date Of Birth is required"
        }
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Phone Number is required"
        },
        notNull: {
          msg: "Phone Number is required"
        }
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "ImageUrl is required"
        },
        notNull: {
          msg: "ImageUrl is required"
        }
      }
    },
    bloodType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Blood Type is required"
        },
        notNull: {
          msg: "Blood Type is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};