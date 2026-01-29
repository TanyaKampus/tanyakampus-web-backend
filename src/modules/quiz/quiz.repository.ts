import prisma from "../../config/prisma";
import { StatusQuiz, TipePertanyaan } from "@prisma/client"


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


const findQuestionByType = async (quiz_id: string, tipe: TipePertanyaan) => {
  return await prisma.pertanyaan.findMany({
    where: {
      quiz_id,
      tipe,
    },
    orderBy: { urutan: "asc" },

    include: {
      jawaban: {
        orderBy: { tipe_jawaban: "desc" }, 
        select: {
          jawaban_id: true,
          tipe_jawaban: true,
          nilai: true, 
        }
      }
    }
  });
};

const findQuestionById = async (pertanyaan_id: string) => {
  return await prisma.pertanyaan.findUnique({
    where: { pertanyaan_id },
    include: {
      jawaban: {
        include: {
          jawabanBidang: {
            include: {
              bidang: true,
            },
          },
        },
      },
      bidang: true,
    },
  });
};

const submitAnswer = async (
  riwayat_id: string,
  pertanyaan_id: string,
  jawaban_id: string
) => {
  return await prisma.jawabanUser.upsert({
    where: {
      riwayat_id_pertanyaan_id: {
        riwayat_id,
        pertanyaan_id,
      },
    },
    update: {
      jawaban_id,
      updatedAt: new Date(),
    },
    create: {
      riwayat_id,
      pertanyaan_id,
      jawaban_id,
    },
  });
};

const countAnswersByHistory = async (
  riwayatId: string,
  tipe?: TipePertanyaan
) => {
  return await prisma.jawabanUser.count({
    where: {
      riwayat_id: riwayatId,
      ...(tipe && {
        pertanyaan: {
          tipe: tipe,
        },
      }),
    },
  });
};

const findHistoryById = async (riwayat_id: string) => {
  return await prisma.riwayatQuiz.findUnique({
    where: { riwayat_id },
    include: {
      hasilJurusan: {
        select: {

          jurusan: {
            select: {
              jurusan_id: true,
              nama_jurusan: true,
            },
          },
        },
      },
      hasilKampus: {
        select: {
          kampus: {
            select: {
              kampus_id: true,
              nama_kampus: true,
            },
          },
        },
      },
    },
  });
};

const findHistoryId = async (riwayat_id: string) => {
  return await prisma.riwayatQuiz.findUnique({
    where: { riwayat_id: riwayat_id },
    include: {
      jawabanUsers: {
        include: {
          pertanyaan: true,
          jawaban: {
            include: {
              jawabanBidang: {
                include: {
                  bidang: true,
                },
              },
            },
          },
        },
      },
      hasilBidang: {
        include: {
          bidang: true,
        },
        orderBy: {
          skor_total: "desc",
        },
      },
      hasilJurusan: {
        include: {
          jurusan: {
            include: {
              bidang: true,
            },
          },
        },

      },
      hasilKampus: {
        include: {
          kampus: {
            include: {
              jurusanKampus: {
                include: {
                  jurusan: true,
                },
              },
            },
          },
        },
      },
    },
  });
};

const saveFieldResults = async (data: {
  riwayat_id: string;
  bidang_id: string;
  skor_bidang: number;
  skor_tiebreaker: number;
  skor_total: number;
  persentase: number;
  is_winner: boolean;
}) => {
  return await prisma.hasilBidang.upsert({
    where: {
      riwayat_id_bidang_id: {
        riwayat_id: data.riwayat_id,
        bidang_id: data.bidang_id,
      },
    },
    update: {
      skor_bidang: data.skor_bidang,
      skor_tiebreaker: data.skor_tiebreaker,
      skor_total: data.skor_total,
      persentase: data.persentase,
      is_winner: data.is_winner,
    },
    create: data,
  });
};

const findAllFields = async () => {
  return await prisma.bidang.findMany({
    orderBy: { nama_bidang: "asc" },
  });
};


const getFieldResults = async (riwayatId: string) => {
  return await prisma.hasilBidang.findMany({
    where: { riwayat_id: riwayatId },
    include: {
      bidang: true,
    },
    orderBy: {
      skor_total: "desc",
    },
  });
};

const setUsedTieBreaker = async (riwayatId: string) => {
  return await prisma.riwayatQuiz.update({
    where: { riwayat_id: riwayatId },
    data: { used_tiebreaker: true },
  });
};

const updateHistoryStatus = async (
  riwayatId: string,
  status: StatusQuiz,
  bidangTerpilih?: string
) => {
  return await prisma.riwayatQuiz.update({
    where: { riwayat_id: riwayatId },
    data: {
      status_quiz: status,
      tanggal_selesai: status === StatusQuiz.COMPLETED ? new Date() : null,
      bidang_terpilih: bidangTerpilih ?? null,
      updatedAt: new Date(),
    },
  });
};

const saveMajorResults = async (data: {
  riwayat_id: string;
  jurusan_id: string;
}) => {
  return await prisma.hasilJurusan.upsert({
    where: {
      riwayat_id_jurusan_id: {
        riwayat_id: data.riwayat_id,
        jurusan_id: data.jurusan_id,
      },
    },
    update: {},
    create: data,
  });
};

const findMajorsByField = async (bidangId: string) => {
  return await prisma.jurusan.findMany({
    where: { bidang_id: bidangId },
    include: {
      jurusanKampus: {
        include: {
          kampus: true,
        },
      },
    },
  });
};

const findCampusByMajors = async (jurusanIds: string[]) => {
  return await prisma.kampus.findMany({
    where: {
      jurusanKampus: {
        some: {
          jurusan_id: {
            in: jurusanIds,
          },
        },
      },
    },
    include: {
      jurusanKampus: {
        where: {
          jurusan_id: {
            in: jurusanIds,
          },
        },
        include: {
          jurusan: true,
        },
      },
    },
  });
};

const saveCampusResults = async (data: {
  riwayat_id: string;
  kampus_id: string;
}) => {
  return await prisma.hasilKampus.upsert({
    where: {
      riwayat_id_kampus_id: {
        riwayat_id: data.riwayat_id,
        kampus_id: data.kampus_id,
      },
    },
    update: {},
    create: data,
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
  findQuestionByType,
  findQuestionById,
  submitAnswer,
  countAnswersByHistory,
  findHistoryById,
  findHistoryId,
  saveFieldResults,
  findAllFields,
  getFieldResults,
  setUsedTieBreaker,
  updateHistoryStatus,
  saveMajorResults,
  findMajorsByField,
  findCampusByMajors,
  saveCampusResults,
};

