import { Request, Response } from "express";
import quizService from "./quiz.service";
import { AuthenticatedRequest } from "../../middleware/auth";
import { TipePertanyaan } from "@prisma/client";

const createQuiz = async (req: Request, res: Response) => {
  try {
    const { nama_quiz, deskripsi_quiz, is_active } = req.body;

    const quiz = await quizService.createQuiz({
      nama_quiz,
      deskripsi_quiz,
      is_active: is_active ?? true,
    });

    res.status(201).json({
      success: true,
      message: "Quiz created successfully",
      data: quiz,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in create quiz controller",
    });
  }
};

const getAllQuiz = async (req: Request, res: Response) => {
  try {
    const data = await quizService.getAllQuiz();

    return res.status(200).json({
      success: true,
      message: "Data retrieved successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error in quiz controller",
    });
  }
};

const getQuizById = async (req: Request, res: Response) => {
  try {
    const quiz_id = req.params.id;

    if (!quiz_id) {
      return res.status(404).json({
        success: false,
        message: "Quiz Missing ID parameter",
      });
    }

    const data = await quizService.getQuizById(quiz_id);

    return res.status(200).json({
      success: true,
      message: "Data retrieved successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error in quiz controller",
    });
  }
};
const updateQuiz = async (req: Request, res: Response) => {
  try {
    const quiz_id = req.params.id;
    const { nama_quiz, deskripsi_quiz, is_active } = req.body;

    if (!quiz_id) {
      return res.status(404).json({
        success: false,
        message: "Missing quiz ID parameter",
      });
    }

    const quiz = await quizService.updateQuiz(quiz_id, {
      nama_quiz,
      deskripsi_quiz,
      is_active,
    });

    res.status(200).json({
      success: true,
      message: "Quiz updated successfully",
      data: quiz,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error in quiz controller",
    });
  }
};

const deleteQuiz = async (req: Request, res: Response) => {
  try {
    const quiz_id = req.params.id;

    if (!quiz_id) {
      return res.status(404).json({
        success: false,
        message: "Missing quiz ID parameter",
      });
    }

    const quiz = await quizService.deleteQuiz(quiz_id);

    res.status(200).json({
      success: true,
      message: "Quiz deleted successfully",
      data: quiz,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error in quiz controller",
    });
  }
};

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

export default {
  createQuiz,
  getAllQuiz,
  getQuizById,
  updateQuiz,
  deleteQuiz,
  getActiveQuiz,
  findQuizById,
  startQuiz,
  getQuestionsByType,
};

