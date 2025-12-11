import quizRepository from "./quiz.repository";

const createQuiz = async (data: {
  nama_quiz: string;
  deskripsi_quiz?: string;
  is_active: boolean;
}) => {
  return await quizRepository.createQuiz(data);
};

const getAllQuiz = async () => {
  const quiz = await quizRepository.getAllQuiz();

  if (!quiz) throw new Error("Quiz not found");

  return quiz;
};

const getQuizById = async (quiz_id: string) => {
  const quiz = await quizRepository.getQuizById(quiz_id);

  if (!quiz) throw new Error("Quiz not found");

  return quiz;
};

const updateQuiz = async (
  quiz_id: string,
  data: {
    nama_quiz?: string;
    deskripsi_quiz?: string;
    is_active?: boolean;
  }
) => {
  const quiz = await quizRepository.updateQuiz(quiz_id, data);

  if (!quiz) {
    throw new Error("Quiz not found");
  }

  return quiz
};

const deleteQuiz = async (quiz_id: string) => {
  const quiz = await quizRepository.deleteQuiz(quiz_id);

  if (!quiz) {
    throw new Error("Quiz not found");
  }

  return quiz;
};

export default {
  createQuiz,
  getAllQuiz,
  getQuizById,
  updateQuiz,
  deleteQuiz,
}

// export const toggleQuizActive = async (quizId: string) => {
//   const quiz = await quizAdminRepository.findQuizById(quizId);

//   if (!quiz) {
//     throw new Error("Quiz not found");
//   }

//   return await quizAdminRepository.toggleQuizActive(quizId, !quiz.is_active);
// };

// export const createQuestion = async (quizId: string, soal: string) => {
//   const quiz = await quizAdminRepository.findQuizById(quizId);

//   if (!quiz) {
//     throw new Error("Quiz not found");
//   }

//   return await quizAdminRepository.createQuestion(quizId, soal);
// };

// export const updateQuestion = async (pertanyaanId: string, soal: string) => {
//   const question = await quizAdminRepository.findQuestionById(pertanyaanId);

//   if (!question) {
//     throw new Error("Question not found");
//   }

//   return await quizAdminRepository.updateQuestion(pertanyaanId, soal);
// };

// export const deleteQuestion = async (pertanyaanId: string) => {
//   const question = await quizAdminRepository.findQuestionById(pertanyaanId);

//   if (!question) {
//     throw new Error("Question not found");
//   }

//   return await quizAdminRepository.deleteQuestion(pertanyaanId);
// };

// export const createAnswer = async (
//   pertanyaanId: string,
//   teks_jawaban: string,
//   urutan: number,
//   bidang_scores?: Array<{ bidang_id: string; bobot: number }>
// ) => {
//   const question = await quizAdminRepository.findQuestionById(pertanyaanId);

//   if (!question) {
//     throw new Error("Question not found");
//   }

//   const answer = await quizAdminRepository.createAnswer(
//     pertanyaanId,
//     teks_jawaban,
//     urutan
//   );

//   // Add bidang scores if provided
//   if (bidang_scores && bidang_scores.length > 0) {
//     await quizAdminRepository.addMultipleBidangToAnswer(
//       answer.jawaban_id,
//       bidang_scores
//     );
//   }

//   return answer;
// };

// export const updateAnswer = async (
//   jawabanId: string,
//   data: {
//     teks_jawaban?: string;
//     urutan?: number;
//   }
// ) => {
//   const answer = await quizAdminRepository.findAnswerById(jawabanId);

//   if (!answer) {
//     throw new Error("Answer not found");
//   }

//   return await quizAdminRepository.updateAnswer(jawabanId, data);
// };

// export const deleteAnswer = async (jawabanId: string) => {
//   const answer = await quizAdminRepository.findAnswerById(jawabanId);

//   if (!answer) {
//     throw new Error("Answer not found");
//   }

//   return await quizAdminRepository.deleteAnswer(jawabanId);
// };

// export const addBidangToAnswer = async (
//   jawabanId: string,
//   bidangId: string,
//   bobot: number
// ) => {
//   const answer = await quizAdminRepository.findAnswerById(jawabanId);

//   if (!answer) {
//     throw new Error("Answer not found");
//   }

//   const bidang = await quizAdminRepository.findBidangById(bidangId);

//   if (!bidang) {
//     throw new Error("Bidang not found");
//   }

//   // Check if already exists
//   const existing = await quizAdminRepository.findJawabanBidang(
//     jawabanId,
//     bidangId
//   );

//   if (existing) {
//     throw new Error("This bidang is already associated with this answer");
//   }

//   return await quizAdminRepository.addBidangToAnswer(
//     jawabanId,
//     bidangId,
//     bobot
//   );
// };

// export const updateBidangBobot = async (
//   jawabanId: string,
//   bidangId: string,
//   bobot: number
// ) => {
//   const jawabanBidang = await quizAdminRepository.findJawabanBidang(
//     jawabanId,
//     bidangId
//   );

//   if (!jawabanBidang) {
//     throw new Error("Bidang association not found");
//   }

//   return await quizAdminRepository.updateBidangBobot(
//     jawabanId,
//     bidangId,
//     bobot
//   );
// };

// export const removeBidangFromAnswer = async (
//   jawabanId: string,
//   bidangId: string
// ) => {
//   const jawabanBidang = await quizAdminRepository.findJawabanBidang(
//     jawabanId,
//     bidangId
//   );

//   if (!jawabanBidang) {
//     throw new Error("Bidang association not found");
//   }

//   return await quizAdminRepository.removeBidangFromAnswer(jawabanId, bidangId);
// };

// export const getQuizStatistics = async () => {
//   return await quizAdminRepository.getQuizStatistics();
// };

// export const getQuizDetailStatistics = async (quizId: string) => {
//   const quiz = await quizAdminRepository.findQuizById(quizId);

//   if (!quiz) {
//     throw new Error("Quiz not found");
//   }

//   return await quizAdminRepository.getQuizDetailStatistics(quizId);
// };
