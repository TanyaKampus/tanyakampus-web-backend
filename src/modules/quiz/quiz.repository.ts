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

const createQuestion = async (quiz_id: string, soal: string) => {
  return await prisma.pertanyaan.create({
    data: {
      quiz_id,
      soal
    }
  });
};

export default {
  createQuiz,
  getAllQuiz,
  getQuizById,
  updateQuiz,
  deleteQuiz,
  createQuestion,
};

// export const toggleQuizActive = async (quizId: string, isActive: boolean) => {
//   return await prisma.quiz.update({
//     where: { quiz_id: quizId },
//     data: { is_active: isActive }
//   });
// };

// // Question CRUD
// export const findQuestionById = async (pertanyaanId: string) => {
//   return await prisma.pertanyaan.findUnique({
//     where: { pertanyaan_id: pertanyaanId }
//   });
// };


// export const updateQuestion = async (pertanyaanId: string, soal: string) => {
//   return await prisma.pertanyaan.update({
//     where: { pertanyaan_id: pertanyaanId },
//     data: { soal }
//   });
// };

// export const deleteQuestion = async (pertanyaanId: string) => {
//   return await prisma.pertanyaan.delete({
//     where: { pertanyaan_id: pertanyaanId }
//   });
// };

// // Answer CRUD
// export const findAnswerById = async (jawabanId: string) => {
//   return await prisma.jawaban.findUnique({
//     where: { jawaban_id: jawabanId }
//   });
// };

// export const createAnswer = async (
//   pertanyaanId: string,
//   teks_jawaban: string,
//   urutan: number
// ) => {
//   return await prisma.jawaban.create({
//     data: {
//       pertanyaan_id: pertanyaanId,
//       teks_jawaban,
//       urutan
//     }
//   });
// };

// export const updateAnswer = async (
//   jawabanId: string,
//   data: {
//     teks_jawaban?: string;
//     urutan?: number;
//   }
// ) => {
//   return await prisma.jawaban.update({
//     where: { jawaban_id: jawabanId },
//     data
//   });
// };

// export const deleteAnswer = async (jawabanId: string) => {
//   return await prisma.jawaban.delete({
//     where: { jawaban_id: jawabanId }
//   });
// };

// // Bidang operations
// export const findBidangById = async (bidangId: string) => {
//   return await prisma.bidang.findUnique({
//     where: { bidang_id: bidangId }
//   });
// };

// export const findJawabanBidang = async (jawabanId: string, bidangId: string) => {
//   return await prisma.jawabanBidang.findUnique({
//     where: {
//       jawaban_id_bidang_id: {
//         jawaban_id: jawabanId,
//         bidang_id: bidangId
//       }
//     }
//   });
// };

// export const addBidangToAnswer = async (
//   jawabanId: string,
//   bidangId: string,
//   bobot: number
// ) => {
//   return await prisma.jawabanBidang.create({
//     data: {
//       jawaban_id: jawabanId,
//       bidang_id: bidangId,
//       bobot
//     }
//   });
// };

// export const addMultipleBidangToAnswer = async (
//   jawabanId: string,
//   bidangScores: Array<{ bidang_id: string; bobot: number }>
// ) => {
//   return await prisma.jawabanBidang.createMany({
//     data: bidangScores.map(bs => ({
//       jawaban_id: jawabanId,
//       bidang_id: bs.bidang_id,
//       bobot: bs.bobot
//     }))
//   });
// };

// export const updateBidangBobot = async (
//   jawabanId: string,
//   bidangId: string,
//   bobot: number
// ) => {
//   return await prisma.jawabanBidang.update({
//     where: {
//       jawaban_id_bidang_id: {
//         jawaban_id: jawabanId,
//         bidang_id: bidangId
//       }
//     },
//     data: { bobot }
//   });
// };

// export const removeBidangFromAnswer = async (
//   jawabanId: string,
//   bidangId: string
// ) => {
//   return await prisma.jawabanBidang.delete({
//     where: {
//       jawaban_id_bidang_id: {
//         jawaban_id: jawabanId,
//         bidang_id: bidangId
//       }
//     }
//   });
// };

// // Statistics
// export const getQuizStatistics = async () => {
//   const totalQuizzes = await prisma.quiz.count();
//   const activeQuizzes = await prisma.quiz.count({
//     where: { is_active: true }
//   });
//   const totalAttempts = await prisma.riwayatQuiz.count();
//   const completedAttempts = await prisma.riwayatQuiz.count({
//     where: { status_quiz: 'COMPLETED' }
//   });

//   const quizzes = await prisma.quiz.findMany({
//     select: {
//       quiz_id: true,
//       nama_quiz: true,
//       is_active: true,
//       _count: {
//         select: {
//           pertanyaan: true,
//           riwayatQuiz: true
//         }
//       }
//     },
//     orderBy: {
//       createdAt: 'desc'
//     }
//   });

//   return {
//     total_quizzes: totalQuizzes,
//     active_quizzes: activeQuizzes,
//     total_attempts: totalAttempts,
//     completed_attempts: completedAttempts,
//     completion_rate: totalAttempts > 0
//       ? Math.round((completedAttempts / totalAttempts) * 100)
//       : 0,
//     quizzes
//   };
// };

// export const getQuizDetailStatistics = async (quizId: string) => {
//   const quiz = await prisma.quiz.findUnique({
//     where: { quiz_id: quizId },
//     include: {
//       pertanyaan: {
//         include: {
//           jawaban: {
//             include: {
//               jawabanBidang: {
//                 include: {
//                   bidang: true
//                 }
//               }
//             }
//           }
//         }
//       },
//       _count: {
//         select: {
//           riwayatQuiz: true
//         }
//       }
//     }
//   });

//   if (!quiz) {
//     throw new Error('Quiz not found');
//   }

//   const completedAttempts = await prisma.riwayatQuiz.count({
//     where: {
//       quiz_id: quizId,
//       status_quiz: 'COMPLETED'
//     }
//   });

//   const inProgressAttempts = await prisma.riwayatQuiz.count({
//     where: {
//       quiz_id: quizId,
//       status_quiz: 'IN_PROGRESS'
//     }
//   });

//   // Get most popular bidang from completed attempts
//   const bidangStats = await prisma.hasilBidang.groupBy({
//     by: ['bidang_id'],
//     where: {
//       riwayat: {
//         quiz_id: quizId,
//         status_quiz: 'COMPLETED'
//       }
//     },
//     _avg: {
//       persentase: true
//     },
//     _count: true
//   });

//   return {
//     quiz: {
//       quiz_id: quiz.quiz_id,
//       nama_quiz: quiz.nama_quiz,
//       deskripsi_quiz: quiz.deskripsi_quiz,
//       is_active: quiz.is_active,
//       total_questions: quiz.pertanyaan.length
//     },
//     attempts: {
//       total: quiz._count.riwayatQuiz,
//       completed: completedAttempts,
//       in_progress: inProgressAttempts
//     },
//     questions: quiz.pertanyaan.map(q => ({
//       pertanyaan_id: q.pertanyaan_id,
//       soal: q.soal,
//       total_answers: q.jawaban.length,
//       jawaban: q.jawaban.map(j => ({
//         jawaban_id: j.jawaban_id,
//         teks_jawaban: j.teks_jawaban,
//         urutan: j.urutan,
//         bidang_count: j.jawabanBidang.length
//       }))
//     })),
//     bidang_statistics: bidangStats
//   };
// };
