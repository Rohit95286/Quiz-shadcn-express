import express from "express";
import cors from "cors";
import {errorHandlerMiddleware} from "./config/errorHandler.js";
import {startServer, web_url} from "./config/sequelize.config.js";
const apiRouter = express.Router();
const app = express();
const PORT = 9000;

import {login, register} from "./controllers/user.controller.js";
import questionRouter from "./routes/questions.js";
import {decodeJWTMiddleware} from "./config/jwtHelper.js";
import quizRouter from "./routes/quiz.js";

// import passport from "./Configs/passport.google.js";

app.use(cors());
app.use(express.json());
app.use("/api", apiRouter);

apiRouter.post("/register", register);
apiRouter.post("/signin", login);
apiRouter.use(decodeJWTMiddleware);
apiRouter.use("/quiz", quizRouter);
apiRouter.use("/questions", questionRouter);
apiRouter.get("/health", (req, res) => {
  res.status(200).json({status: "ojk"});
});

app.use(errorHandlerMiddleware);

// _____________________________________Passport JS_________________________________________

app.use((req, res, next) => {
  res.status(404).json({success: false, message: "Not Found"});
});

app.listen(PORT, () => {
  startServer();
  console.log("Starting server...");
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
