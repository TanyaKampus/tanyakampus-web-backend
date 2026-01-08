import prisma from "../../config/prisma";

export const getQuizById = async (quiz_id: string) => {
  return await prisma.quiz.findUnique({
    where: {
      quiz_id,
    },
  });
};

const getAllQuiz = async () => {
  return await prisma.quiz.findMany();
};

const createQuiz = async (data: {
  nama_quiz: string;
  deskripsi_quiz?: string;
  is_active: boolean;
}) => {
  return await prisma.quiz.create({
    data,
  });
};

const updateQuiz = async (
  quiz_id: string,
  data: {
    nama_quiz?: string;
    deskripsi_quiz?: string;
    is_active?: boolean;
  }
) => {
  return await prisma.quiz.update({
    where: { quiz_id },
    data,
  });
};

const deleteQuiz = async (quiz_id: string) => {
  return await prisma.quiz.delete({
    where: {
      quiz_id,
    },
  });
};

const findActiveQuiz = async () => {
  return await prisma.quiz.findFirst({
    where: { is_active: true },
  });
};

const findQuizById = async (quizId: string) => {
  return await prisma.quiz.findUnique({
    where: { quiz_id: quizId },
  });
};

const startQuiz = async (user_id: string, quiz_id: string) => {
  return await prisma.riwayatQuiz.create({
    data: {
      quiz_id,
      user_id,
      status_quiz: StatusQuiz.IN_PROGRESS,
    },
  });
};

export default {
  createQuiz,
  getAllQuiz,
  findQuizById,
  updateQuiz,
  deleteQuiz,
  findActiveQuiz,
  startQuiz,
};

