import express from "express";
import quizController from "./quiz.controller";
import authMiddleware from "../../middleware/auth";

const router = express.Router();


router.post("/", quizController.createQuiz)
router.get("/", quizController.getAllQuiz)
router.get("/:id", quizController.getQuizById)
router.patch("/:id", quizController.updateQuiz)
router.delete("/:id", quizController.deleteQuiz)


// QUIZ 
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

// QUESTIONS
router.get(
  "/:quiz_id/questions/type",
  authMiddleware.protectRoute,
  quizController.getQuestionsByType
); 


// HISTORY
router.get(
  "/history/:riwayat_id",
  authMiddleware.protectRoute,
  quizController.getHistoryById
);

router.post(
  "/history/:riwayat_id/answer",
  authMiddleware.protectRoute,
  quizController.submitAnswer
);
router.get(
  "/history/:riwayat_id/answer/count",
  authMiddleware.protectRoute,
  quizController.countAnswerByHistory
); 

// SCORING
router.post(
  "/history/:riwayat_id/calculate",
  authMiddleware.protectRoute,
  quizController.calculateFieldScores
);

router.get(
  "/history/:riwayat_id/results",
  authMiddleware.protectRoute,
  quizController.getFieldResults
); 

// TIEBREAKER 
router.put(
  "/history/:riwayat_id/tiebreaker",
  authMiddleware.protectRoute,
  quizController.setUsedTieBreaker
); 

// COMPLETE/ABANDON 
router.put(
  "/history/:riwayat_id/complete",
  authMiddleware.protectRoute,
  quizController.completeQuiz
);

router.put(
  "/history/:riwayatId/abandon",
  authMiddleware.protectRoute,
  quizController.abandonQuiz
);

// RECOMMENDATIONS
router.post(
  "/history/:riwayat_id/majors",
  authMiddleware.protectRoute,
  quizController.calculateMajorResults
);

router.post(
  "/history/:riwayat_id/campus",
  authMiddleware.protectRoute,
  quizController.calculateCampusResults
); 

export default router
