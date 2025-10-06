import Question from "../models/Question.js";

// Create Question
export const createQuestion = async (req, res) => {
  try {
    const {question_text, options, correct_answer, skill} = req.body;

    const question = await Question.create({
      question_text,
      options,
      correct_answer,
      skill,
    });

    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

export const getQuestions = async (req, res) => {
  try {
    const {skill} = req.query;

    const whereClause = skill ? {skill} : {};

    const questions = await Question.findAll({where: whereClause});

    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

export const updateQuestion = async (req, res) => {
  try {
    const {id} = req.params;
    const {question_text, options, correct_answer, skill} = req.body;

    const question = await Question.findByPk(id);
    if (!question) return res.status(404).json({message: "Question not found"});

    await question.update({question_text, options, correct_answer, skill});
    res.json(question);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    const {id} = req.params;
    const question = await Question.findByPk(id);
    if (!question) return res.status(404).json({message: "Question not found"});

    await question.destroy();
    res.json({message: "Question deleted"});
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};
