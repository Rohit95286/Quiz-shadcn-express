import {sequelize} from "../config/sequelize.config.js";
import QuizAttempt from "../models/attempts.js";
import Question from "../models/Question.js";

export const submitQuizAttempts = async (req, res) => {
  console.log("Am I here???");
  try {
    const {user} = req.body;
    const {attempts} = req.body;

    if (!attempts || !Array.isArray(attempts))
      return res.status(400).json({message: "Invalid attempts"});

    const results = [];

    for (const item of attempts) {
      const question = await Question.findByPk(item.questionId);
      if (!question) continue;

      const is_correct = question.correct_answer === item.answer;

      const attempt = await QuizAttempt.create({
        userId: user.id,
        questionId: question.id,
        is_correct,
        selected_answer: item.answer,
      });

      results.push(attempt);
    }

    res.status(201).json({message: "Quiz submitted", attempts: results});
  } catch (err) {
    console.error(err);
    res.status(500).json({message: err.message});
  }
};

export const getUserPerformanceBySkill = async (req, res) => {
  try {
    const {user} = req.body;

    const results = await QuizAttempt.findAll({
      attributes: [
        [sequelize.col("Question.skill"), "skill"],
        [
          sequelize.fn("COUNT", sequelize.col("QuizAttempt.id")),
          "total_attempts",
        ],
        [
          sequelize.fn(
            "SUM",
            sequelize.literal(
              "CASE WHEN QuizAttempt.is_correct THEN 1 ELSE 0 END"
            )
          ),
          "correct_attempts",
        ],
      ],
      where: {userId: user.id},
      include: [
        {
          model: Question,
          attributes: [],
        },
      ],
      group: ["Question.skill"],
    });

    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({message: err.message});
  }
};

export const getAllUsersPerformanceBySkill = async (req, res) => {
  try {
    const results = await QuizAttempt.findAll({
      attributes: [
        "userId",
        [sequelize.col("Question.skill"), "skill"],
        [
          sequelize.fn("COUNT", sequelize.col("QuizAttempt.id")),
          "total_attempts",
        ],
        [
          sequelize.fn(
            "SUM",
            sequelize.literal(
              "CASE WHEN QuizAttempt.is_correct THEN 1 ELSE 0 END"
            )
          ),
          "correct_attempts",
        ],
      ],
      include: [
        {
          model: Question,
          attributes: [],
        },
      ],
      group: ["userId", "Question.skill"],
      order: [["userId", "ASC"]],
    });

    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({message: err.message});
  }
};
