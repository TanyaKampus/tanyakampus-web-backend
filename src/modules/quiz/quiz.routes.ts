import express from "express";
import quizController from "./quiz.controller";
// import authMiddleware from "../../middleware/auth";

const router = express.Router();


router.post("/", quizController.createQuiz)
router.get("/", quizController.getAllQuiz)
router.get("/:id", quizController.getQuizById)
router.patch("/:id", quizController.updateQuiz)
router.delete("/:id", quizController.deleteQuiz)



export default router
// // Public routes
// router.get("/active", quizController.getActiveQuizzes);
// router.get("/:quizId", quizController.getQuizDetail);

// // Protected routes (need authentication)
// router.post(
//   "/:quizId/start",
//   authMiddleware.protectRoute,
//   quizController.startQuiz
// );
// router.post(
//   "/sessions/:riwayatId/answer",
//   authMiddleware.protectRoute,
//   quizController.submitAnswer
// );
// router.get(
//   "/sessions/:riwayatId",
//   authMiddleware.protectRoute,
//   quizController.getQuizSession
// );
// router.post(
//   "/sessions/:riwayatId/complete",
//   authMiddleware.protectRoute,
//   quizController.completeQuiz
// );
// router.get(
//   "/sessions/:riwayatId/results",
//   authMiddleware.protectRoute,
//   quizController.getQuizResults
// );
// router.get(
//   "/history",
//   authMiddleware.protectRoute,
//   quizController.getUserQuizHistory
// );

// export default router;
