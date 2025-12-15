import express from "express";
import { generateQuiz } from "../controller/quizController.js";

const router = express.Router();

// GET /api/quiz/:tutorialId
router.get("/:tutorialId", generateQuiz);

export default router;
