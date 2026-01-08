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

router.get("/:quiz_id", authMiddleware.protectRoute, quizController.findQuizById);
router.post(
  "/:quiz_id/start",
  authMiddleware.protectRoute,
  quizController.startQuiz
);

router.get(
  "/:quiz_id/questions/type",
  authMiddleware.protectRoute,
  quizController.getQuestionsByType
); 



export default router
