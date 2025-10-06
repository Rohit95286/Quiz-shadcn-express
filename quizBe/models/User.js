import {DataTypes} from "sequelize";
import {collectionName, ROLES} from "../utils/constant.js";
import {sequelize} from "../config/sequelize.config.js";
import bcrypt from "bcryptjs";

const User = sequelize.define(
  collectionName?.USERS,
  {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    name: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.ENUM(...ROLES), defaultValue: "user"},
  },
  {
    defaultScope: {
      // Never return password by default
      attributes: {exclude: ["password"]},
    },
  }
);

User.beforeCreate(async user => {
  user.password = await bcrypt.hash(user.password, 10);
});

export default User;
