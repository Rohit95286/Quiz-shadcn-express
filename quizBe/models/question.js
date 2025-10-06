import {DataTypes} from "sequelize";
import {sequelize} from "../config/sequelize.config.js";
import {SKILL_NAMES} from "../utils/constant.js";

const Question = sequelize.define("Question", {
  id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
  question_text: {type: DataTypes.TEXT, allowNull: false},
  options: {type: DataTypes.JSON, allowNull: false},
  correct_answer: {type: DataTypes.STRING, allowNull: false},
  skill: {type: DataTypes.ENUM(...SKILL_NAMES), allowNull: false},
});

export default Question;
