import {Op} from "sequelize";
import {responseHandler} from "../config/responseHandler";
import Skill from "../models/skills.model";
import User from "../models/user.model";

export const timeReport = async (req, res) => {
  try {
    const {from, to, skillId} = req.query;
    const where = {};

    if (from && to) {
      where.createdAt = {[Op.between]: [new Date(from), new Date(to)]};
    }

    if (skillId) {
      where.skillId = skillId;
    }

    const results = await QuizAttempt.findAll({
      where,
      include: [
        {model: User, attributes: ["name", "email"]},
        {model: Skill, attributes: ["name"]},
      ],
    });

    responseHandler({
      req,
      res,
      data: results,
      message: "Time-based quiz attempts report",
      status: 200,
    });
  } catch (err) {
    responseHandler({req, res, success: false, message: err.message});
  }
};
