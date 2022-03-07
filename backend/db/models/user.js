'use strict';
const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256]
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }
  },
    {
      defaultScope: {
        attributes: {
          exclude: ['lastName', 'hashedPassword', 'email', 'createdAt', 'updatedAt']
        }
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ['hashedPassword'] }
        },
        loginUser: {
          attributes: {}
        }
      }
    });

  // Returns information that is safe to have in a JWT
  User.prototype.toSafeObject = function () { // remember, this cannot be an arrow function
    const { id, email } = this; // context will be the User instance
    return { id, email, firstName};
  };

  // Returns a boolean if a password match is valid or not
  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  // Returns user information within the current scope which is defined starting on line 35
  User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
  };

  // Takes in an object with credentials and a password
  // If the login is successful then the current user scope is returned
  User.login = async function ({ credential, password }) {
    const user = await User.scope('loginUser').findOne({
      where: {
        email: credential
      }
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };

  // Takes in an object. Hashes password with bcrypt, then saves the user information
  // Returns the current scope for User
  User.signup = async function ({ email, password, firstName, lastName }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      firstName,
      lastName,
      email,
      hashedPassword
    });
    return await User.scope('currentUser').findByPk(user.id);
  };


  // Associations / foreign keys
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Spot, { foreignKey: 'userId' });
    User.hasMany(models.Booking, { foreignKey: 'userId' });
  };

  return User;
};