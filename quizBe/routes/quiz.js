import express from "express";
import {
  getAllUsersPerformanceBySkill,
  getUserPerformanceBySkill,
  submitQuizAttempts,
} from "../controllers/attempts.controller.js";
const quizRouter = express.Router();

quizRouter.post("/attempts", submitQuizAttempts);
quizRouter.get("/attempts", getUserPerformanceBySkill);
quizRouter.get("/all-attempts", getAllUsersPerformanceBySkill);

export default quizRouter;
