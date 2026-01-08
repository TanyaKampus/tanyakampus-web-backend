import express from "express";
import quizController from "./quiz.controller";
import authMiddleware from "../../middleware/auth";

const router = express.Router();


router.post("/", quizController.createQuiz)
router.get("/", quizController.getAllQuiz)
router.get("/:id", quizController.getQuizById)
router.patch("/:id", quizController.updateQuiz)
router.delete("/:id", quizController.deleteQuiz)

router.get(
  "/active",
  authMiddleware.protectRoute,
  quizController.getActiveQuiz
);



export default router
