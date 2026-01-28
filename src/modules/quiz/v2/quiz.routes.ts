import express from "express";
import quizController  from "./quiz.controller";
import authMiddleware from "../../../middleware/auth";

const router = express.Router();

router.get("/fields", quizController.getAllFields);
router.get("/fields/:bidang_id", quizController.getFieldById);
router.get("/fields/:bidang_id/majors", quizController.getMajorsByField);

router.get(
  "/history/me",
  authMiddleware.protectRoute,
  quizController.getUserHistory
);

router.get(
  "/active",
  authMiddleware.protectRoute,
  quizController.getActiveQuiz
);

//  QUIZ ROUTES 
router.get("/:quiz_id", authMiddleware.protectRoute, quizController.findQuizById);
router.post(
  "/:quiz_id/start",
  authMiddleware.protectRoute,
  quizController.startQuiz
);

//  QUESTIONS ROUTES 
router.get(
  "/:quiz_id/questions",
  authMiddleware.protectRoute,
  quizController.getAllQuestions
);
router.get(
  "/:quiz_id/questions/type",
  authMiddleware.protectRoute,
  quizController.getQuestionsByType
); 


router.get(
  "/questions/:question_id",
  authMiddleware.protectRoute,
  quizController.getQuestionById
);

//  HISTORY ROUTES 
router.get(
  "/history/:riwayat_id",
  authMiddleware.protectRoute,
  quizController.getHistoryById
);

// ANSWER ROUTES 
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

//  SCORING ROUTES 
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

//  TIEBREAKER ROUTES 
router.put(
  "/history/:riwayat_id/tiebreaker",
  authMiddleware.protectRoute,
  quizController.setUsedTieBreaker
); 

// COMPLETE/ABANDON ROUTES 
router.put(
  "/history/:riwayat_id/complete",
  authMiddleware.protectRoute,
  quizController.completeQuiz
);
router.put(
  "/history/:riwayat_id/abandon",
  authMiddleware.protectRoute,
  quizController.abandonQuiz
);

// RECOMMENDATIONS ROUTES 
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

router.post(
  "/history/:riwayat_id/answer/batch", 
  authMiddleware.protectRoute,
  quizController.submitAnswersBatch
);
export default router;
console.log("test");