'use strict';
const {Model, Validator} = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      const { id, username, firstName, lastName, email } = this; // context will be the User instance
      return { id, username, firstName, lastName, email };
    }
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Spot, { foreignKey: 'ownerId', onDelete: 'CASCADE', hooks: true });
      User.hasMany(models.Booking, { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true });
      User.hasMany(models.Review, { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true });
    }
    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }
    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    }
    static async signup({ username, email, password, firstName, lastName }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        username,
        firstName,
        lastName,
        email,
        hashedPassword
      });
      return await User.scope('currentUser').findByPk(user.id);
    }
  }



  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 30],
        // isNotEmail(value) {
        //   if (Validator.isEmail(value)) {
        //     throw new Error("Cannot be an email.");
        //   }
        // }
        // isEmail: false,
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 100],
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 100],
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256],
        isEmail: true
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60],
      }
    }
  }, {
    sequelize,
    modelName: 'User',defaultScope: {
      attributes: {
        exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
      }
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ["hashedPassword"] }
      },
      loginUser: {
        attributes: {}
      }
    }
  }
);
  return User;
};
