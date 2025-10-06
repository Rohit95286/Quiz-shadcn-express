import {DataTypes} from "sequelize";
import {sequelize} from "../config/sequelize.config.js";

import User from "./User.js";

import {collectionName} from "../utils/constant.js";
import Question from "./Question.js";

const QuizAttempt = sequelize.define(
  collectionName?.QUIZ_ATTEMPTS,
  {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    userId: {type: DataTypes.INTEGER, allowNull: false},
    questionId: {type: DataTypes.INTEGER, allowNull: false},
    is_correct: {type: DataTypes.BOOLEAN, allowNull: false},
  },
  {
    timestamps: true,
  }
);

QuizAttempt.belongsTo(User, {foreignKey: "userId", onDelete: "CASCADE"});
QuizAttempt.belongsTo(Question, {
  foreignKey: "questionId",
  onDelete: "CASCADE",
});

export default QuizAttempt;
