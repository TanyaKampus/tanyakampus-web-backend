import express from "express";
import quizController from "./quiz.controller";
import authMiddleware from "../../../middleware/auth";

const router = express.Router();

// ==================== AUTHENTICATED ROUTES ====================

// Get user quiz history
router.get(
  "/history/me",
  authMiddleware.protectRoute,
  quizController.getUserHistory
);

// Get active quiz
router.get(
  "/active",
  authMiddleware.protectRoute,
  quizController.getActiveQuiz
);

// ==================== QUIZ ROUTES ====================
// Get quiz by ID
router.get(
  "/:quiz_id", 
  authMiddleware.protectRoute, 
  quizController.findQuizById
);

// Start quiz
router.post(
  "/:quiz_id/start",
  authMiddleware.protectRoute,
  quizController.startQuiz
);

// ==================== QUESTIONS ROUTES ====================
// Get questions by type (BIDANG or TIE_BREAKER)
router.get(
  "/:quiz_id/questions/type",
  authMiddleware.protectRoute,
  quizController.getQuestionsByType
); 

// ==================== HISTORY ROUTES ====================
// Get quiz history by ID (with results if completed)
router.get(
  "/history/:riwayat_id",
  authMiddleware.protectRoute,
  quizController.getHistoryById
);

// ==================== ANSWER ROUTES ====================
// Submit single answer
router.post(
  "/history/:riwayat_id/answer",
  authMiddleware.protectRoute,
  quizController.submitAnswer
);

// Submit multiple answers (batch)
router.post(
  "/history/:riwayat_id/answer/batch", 
  authMiddleware.protectRoute,
  quizController.submitAnswersBatch
);

// Count answers submitted
router.get(
  "/history/:riwayat_id/answer/count",
  authMiddleware.protectRoute,
  quizController.countAnswerByHistory
); 

// ==================== SCORING ROUTES ====================
// Calculate field scores
router.post(
  "/history/:riwayat_id/calculate",
  authMiddleware.protectRoute,
  quizController.calculateFieldScores
);

// Get field results
router.get(
  "/history/:riwayat_id/results",
  authMiddleware.protectRoute,
  quizController.getFieldResults
); 

// ==================== TIEBREAKER ROUTES ====================
// Set tiebreaker used flag
router.put(
  "/history/:riwayat_id/tiebreaker",
  authMiddleware.protectRoute,
  quizController.setUsedTieBreaker
); 

// ==================== COMPLETE/ABANDON ROUTES ====================
router.put(
  "/history/:riwayat_id/complete",
  authMiddleware.protectRoute,
  quizController.completeQuiz
);

// Abandon quiz
router.put(
  "/history/:riwayat_id/abandon",
  authMiddleware.protectRoute,
  quizController.abandonQuiz
);

export default router;