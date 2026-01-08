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

const getActiveQuiz = async () => {
  const quiz = await quizRepository.findActiveQuiz();
  if (!quiz) throw new Error("No active quiz found");
  return quiz;
};


export default {
  createQuiz,
  getAllQuiz,
  getQuizById,
  updateQuiz,
  deleteQuiz,
  getActiveQuiz,
}

