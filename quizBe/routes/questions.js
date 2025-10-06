import express from "express";
import {
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestions,
} from "../controllers/question.controller.js";

const questionRouter = express.Router();

questionRouter.get("/", getQuestions);

questionRouter.post("/", createQuestion);

questionRouter.put("/:id", updateQuestion);

questionRouter.delete("/:id", deleteQuestion);

export default questionRouter;
