import { Request, Response } from "express";
import { TipePertanyaan } from "@prisma/client";

import quizService from "./quiz.service";
import { AuthenticatedRequest } from "../../../middleware/auth";

const getActiveQuiz = async (req: Request, res: Response) => {
  try {
    const quiz = await quizService.getActiveQuiz();

    res.status(200).json({
      success: true,
      message: "Active quiz retrieved successfully",
      data: quiz,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

const findQuizById = async (req: Request, res: Response) => {
  try {
    const {quiz_id} = req.params;

    if (!quiz_id) {
      return res.status(400).json({
        success: false,
        message: "Missing quiz ID parameter",
      });
    }

    const quiz = await quizService.getQuizById(quiz_id);

    return res.status(200).json({
      success: true,
      message: "Quiz retrieved successfully",
      data: quiz,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

const startQuiz = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const {quiz_id} = req.params;

    const user_id = req.user?.user_id;

    if (!quiz_id) {
      return res.status(400).json({
        success: false,
        message: "Missing quiz ID parameter",
      });
    }

    if (!user_id) {
      return res.status(400).json({
        success: false,
        message: "Unauthorized - User not authenticated",
      });
    }

    const quiz = await quizService.startQuiz(user_id, quiz_id);

    return res.status(200).json({
      success: true,
      message: "Quiz started successfully",
      data: quiz,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};


const getQuestionsByType = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { quiz_id } = req.params;
    const { tipe } = req.query

    if (!quiz_id) {
      return res.status(400).json({
        success: false,
        message: "Missing quiz ID parameter",
      });
    }

    if (!tipe) {
      return res.status(400).json({
        success: false,
        message: "Missing type parameter",
      });
    }

    const questions = await quizService.getQuestionsByType(
      quiz_id,
      tipe as TipePertanyaan
    );

    return res.status(200).json({
      success: true,
      message: "Questions retrieved successfully",
      data: questions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

const getHistoryById = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { riwayat_id } = req.params;

    if (!riwayat_id) {
      return res.status(400).json({
        success: false,
        message: "Missing history ID parameter",
      });
    }

    const history = await quizService.getHistoryById(riwayat_id);

    if (history.user_id !== req.user?.user_id) {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to view this quiz",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Quiz history retrieved successfully",
      data: history,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

const getUserHistory = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user_id = req.user?.user_id;
    const limit = parseInt(req.query.limit as string) || 10;

    if (!user_id) {
      return res.status(400).json({
        success: false,
        message: "Unauthorized - User not authenticated",
      });
    }

    const history = await quizService.getUserHistory(user_id, limit);

    return res.status(200).json({
      success: true,
      message: "User history retrieved successfully",
      data: history,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

const submitAnswer = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const {riwayat_id} = req.params;
    const { pertanyaan_id, jawaban_id } = req.body;
    
    if (!riwayat_id || !pertanyaan_id || !jawaban_id) {
      return res.status(400).json({
        success: false,
        message: "Missing required parameters",
      });
    }

    const result = await quizService.submitAnswer(
      riwayat_id,
      pertanyaan_id,
      jawaban_id
    );

    return res.status(200).json({
      success: true,
      message: "Answer submitted successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

const countAnswerByHistory = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { riwayat_id } = req.params;
    const { tipe } = req.query;

    if (!riwayat_id) {
      return res.status(400).json({
        success: false,
        message: "Missing history ID parameter",
      });
    }

    const result = await quizService.countAnswersByHistory(
      riwayat_id,
      tipe as TipePertanyaan
    );

    return res.status(200).json({
      success: true,
      message: "Answer count retrieved successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

const calculateFieldScores = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const {riwayat_id} = req.params;
    if (!riwayat_id) {
      return res.status(400).json({
        success: false,
        message: "Missing history ID parameter",
      });
    }

    const result = await quizService.calculateAndSaveFieldResults(riwayat_id);

    return res.status(200).json({
      success: true,
      message: "Field scores calculated successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

const setUsedTieBreaker = async (req: Request, res: Response) => {
  try {
    const { riwayat_id } = req.params;

    if(!riwayat_id) {
      return res.status(400).json({
        success: false,
        message: "Missing history ID parameter"
      })
    }
    
    const result = await quizService.setUsedTiebreaker(riwayat_id);

    return res.status(200).json({
      success: true,
      message: "Tiebreaker flag set successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: (error as Error).message
    })
  }
};

const completeQuiz = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const {riwayat_id} = req.params;

    if (!riwayat_id) {
      return res.status(400).json({
        success: false,
        message: "Missing history ID parameter",
      });
    }

    const result = await quizService.completeQuiz(riwayat_id);

    return res.status(200).json({
      success: true,
      message: "Quiz completed successfully with recommendations",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

const abandonQuiz = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const {riwayat_id} = req.params;

    if (!riwayat_id) {
      return res.status(400).json({
        success: false,
        message: "Missing history ID parameter",
      });
    }

    const result = await quizService.abandonQuiz(riwayat_id);

    return res.status(200).json({
      success: true,
      message: "Quiz abandoned successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};


const getFieldResults = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const {riwayat_id} = req.params;

    if (!riwayat_id) {
      return res.status(400).json({
        success: false,
        message: "Missing history ID parameter",
      });
    }

    const result = await quizService.getFieldResults(riwayat_id);

    return res.status(200).json({
      success: true,
      message: "Field results retrieved successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

const submitAnswersBatch = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { riwayat_id } = req.params;
    const { answers } = req.body;
    const user_id = req.user?.user_id;

    if (!riwayat_id) {
      return res.status(400).json({
        success: false,
        message: "Missing history ID parameter",
      });
    }

    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({
        success: false,
        message: "answers must be a non-empty array",
      });
    }

    // Validate each answer has required fields
    const invalidAnswers = answers.filter(
      a => !a.pertanyaan_id || !a.jawaban_id
    );

    if (invalidAnswers.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Each answer must have pertanyaan_id and jawaban_id",
      });
    }

    if (!user_id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - User not authenticated",
      });
    }

    const result = await quizService.submitAnswersBatch(
      user_id,
      riwayat_id,
      answers
    );

    return res.status(200).json({
      success: true,
      message: `${result.submitted} answers submitted successfully`,
      data: result.data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

export default {
  submitAnswersBatch,
  getActiveQuiz,
  findQuizById,
  startQuiz,
  getQuestionsByType,
  getUserHistory,
  getHistoryById,
  submitAnswer,
  countAnswerByHistory,
  calculateFieldScores,
  setUsedTieBreaker,
  completeQuiz,
  abandonQuiz,
  getFieldResults,
};