import { Request, Response } from "express";
import quizService from "./quiz.service";

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

export default {
  createQuiz,
  getAllQuiz,
  getQuizById,
  updateQuiz,
  deleteQuiz,
};

// Update quiz

// // Toggle quiz active status
// export const toggleQuizActive = async (
//   req: AuthenticatedRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { quizId } = req.params;

//     const quiz = await quizAdminService.toggleQuizActive(quizId);

//     res.status(200).json({
//       success: true,
//       message: `Quiz ${
//         quiz.is_active ? "activated" : "deactivated"
//       } successfully`,
//       data: quiz,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // Create question
// export const createQuestion = async (
//   req: AuthenticatedRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { quizId } = req.params;
//     const { soal } = req.body;

//     if (!soal) {
//       return res.status(400).json({
//         success: false,
//         message: "soal is required",
//       });
//     }

//     const question = await quizAdminService.createQuestion(quizId, soal);

//     res.status(201).json({
//       success: true,
//       message: "Question created successfully",
//       data: question,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // Update question
// export const updateQuestion = async (
//   req: AuthenticatedRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { pertanyaanId } = req.params;
//     const { soal } = req.body;

//     if (!soal) {
//       return res.status(400).json({
//         success: false,
//         message: "soal is required",
//       });
//     }

//     const question = await quizAdminService.updateQuestion(pertanyaanId, soal);

//     res.status(200).json({
//       success: true,
//       message: "Question updated successfully",
//       data: question,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // Delete question
// export const deleteQuestion = async (
//   req: AuthenticatedRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { pertanyaanId } = req.params;

//     await quizAdminService.deleteQuestion(pertanyaanId);

//     res.status(200).json({
//       success: true,
//       message: "Question deleted successfully",
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // Create answer
// export const createAnswer = async (
//   req: AuthenticatedRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { pertanyaanId } = req.params;
//     const { teks_jawaban, urutan, bidang_scores } = req.body;

//     if (!teks_jawaban || urutan === undefined) {
//       return res.status(400).json({
//         success: false,
//         message: "teks_jawaban and urutan are required",
//       });
//     }

//     const answer = await quizAdminService.createAnswer(
//       pertanyaanId,
//       teks_jawaban,
//       urutan,
//       bidang_scores
//     );

//     res.status(201).json({
//       success: true,
//       message: "Answer created successfully",
//       data: answer,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // Update answer
// export const updateAnswer = async (
//   req: AuthenticatedRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { jawabanId } = req.params;
//     const { teks_jawaban, urutan } = req.body;

//     const answer = await quizAdminService.updateAnswer(jawabanId, {
//       teks_jawaban,
//       urutan,
//     });

//     res.status(200).json({
//       success: true,
//       message: "Answer updated successfully",
//       data: answer,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // Delete answer
// export const deleteAnswer = async (
//   req: AuthenticatedRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { jawabanId } = req.params;

//     await quizAdminService.deleteAnswer(jawabanId);

//     res.status(200).json({
//       success: true,
//       message: "Answer deleted successfully",
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // Add bidang to answer with bobot
// export const addBidangToAnswer = async (
//   req: AuthenticatedRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { jawabanId } = req.params;
//     const { bidang_id, bobot } = req.body;

//     if (!bidang_id || bobot === undefined) {
//       return res.status(400).json({
//         success: false,
//         message: "bidang_id and bobot are required",
//       });
//     }

//     const jawabanBidang = await quizAdminService.addBidangToAnswer(
//       jawabanId,
//       bidang_id,
//       bobot
//     );

//     res.status(201).json({
//       success: true,
//       message: "Bidang added to answer successfully",
//       data: jawabanBidang,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // Update bidang bobot
// export const updateBidangBobot = async (
//   req: AuthenticatedRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { jawabanId, bidangId } = req.params;
//     const { bobot } = req.body;

//     if (bobot === undefined) {
//       return res.status(400).json({
//         success: false,
//         message: "bobot is required",
//       });
//     }

//     const jawabanBidang = await quizAdminService.updateBidangBobot(
//       jawabanId,
//       bidangId,
//       bobot
//     );

//     res.status(200).json({
//       success: true,
//       message: "Bidang bobot updated successfully",
//       data: jawabanBidang,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // Remove bidang from answer
// export const removeBidangFromAnswer = async (
//   req: AuthenticatedRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { jawabanId, bidangId } = req.params;

//     await quizAdminService.removeBidangFromAnswer(jawabanId, bidangId);

//     res.status(200).json({
//       success: true,
//       message: "Bidang removed from answer successfully",
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // Get quiz statistics
// export const getQuizStatistics = async (
//   req: AuthenticatedRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const stats = await quizAdminService.getQuizStatistics();

//     res.status(200).json({
//       success: true,
//       data: stats,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // Get quiz detail statistics
// export const getQuizDetailStatistics = async (
//   req: AuthenticatedRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { quizId } = req.params;

//     const stats = await quizAdminService.getQuizDetailStatistics(quizId);

//     res.status(200).json({
//       success: true,
//       data: stats,
//     });
//   } catch (error) {
//     next(error);
//   }
// };
