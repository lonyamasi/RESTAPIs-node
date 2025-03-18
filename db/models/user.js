'use strict';
const {Model, DataTypes, Error} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../../config/database');

module.exports = sequelize.define('user', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  userType: {
    type: DataTypes.ENUM('0','1','2')
  },
  firstName: {
    type: DataTypes.STRING
  },
  lastName: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  confirmPassword: {

    type: DataTypes.VIRTUAL,
    set(value){ //runs before saving the password to db
      if(value === this.password){
        const hashPassword = bcrypt.hashSync(value, 10); //using bcrypt to hash the password before saving it, 10 is the salt rounds meaning the password will be hashed with extra security
        this.setDataValue("password", hashPassword) //replaces the plain text password with hashed version inside sequelize

      }else {
        throw new Error("Password and confirm password must be the same") //Error if password doesnt match and sequelize wll ot save the data
      }
    }

  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  deletedAt: {
    type:DataTypes.DATE,

  }
}, {
  paranoid:true,
  freezeTableName: true,
  modelName:'user'
});