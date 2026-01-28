import { PrismaClient, StatusQuiz, TipePertanyaan } from "@prisma/client";

const prisma = new PrismaClient();

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

const findAllQuestion = async (quiz_id: string) => {
  return await prisma.pertanyaan.findMany({
    where: { quiz_id },
    orderBy: { urutan: "asc" },
    include:{
      jawaban:{ 
        orderBy:{tipe_jawaban:"desc"},
        select: {
          jawaban_id: true,
          tipe_jawaban: true,
        }
      }
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

const findHistoryById = async (riwayat_id: string) => {
  return await prisma.riwayatQuiz.findUnique({
    where: { riwayat_id },
    include: {
      quiz: {
        select: {
          quiz_id: true,
          nama_quiz: true
        }
      },
      
      hasilBidang: {
        include: {
          bidang: true
        },
        orderBy: {
          skor_total: "desc"
        }
      },
      
      hasilJurusan: {
        include: {
          jurusan: {
            include: {
              bidang: {
                select: {
                  bidang_id: true,
                  nama_bidang: true
                }
              },
              jurusanKampus: {
                include: {
                  kampus: {
                    select: {
                      kampus_id: true,
                      nama_kampus: true
                    }
                  }
                }
              }
            }
          }
        }
      },
      
      hasilKampus: {
        include: {
          kampus: {
            include: {
              jurusanKampus: {
                where: {
                  jurusan: {
                    hasilJurusan: {
                      some: {
                        riwayat_id: riwayat_id
                      }
                    }
                  }
                },
                include: {
                  jurusan: {
                    select: {
                      jurusan_id: true,
                      nama_jurusan: true
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
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

const findUserHistory = async (userId: string, limit: number = 10) => {
  return await prisma.riwayatQuiz.findMany({
    where: { user_id: userId },
    orderBy: { createdAt: "desc" },
    take: limit,
    select: {
      riwayat_id: true,
      status_quiz: true,
      tanggal_mulai: true,
      tanggal_selesai: true,
      quiz: { select: { nama_quiz: true } },
      bidang_terpilih: true,
    },
  });
};

const updateRiwayatStatus = async (
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

const setUsedTieBreaker = async (riwayatId: string) => {
  return await prisma.riwayatQuiz.update({
    where: { riwayat_id: riwayatId },
    data: { used_tiebreaker: true },
  });
};
const countJawabanByRiwayat = async (
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
const saveHasilBidang = async (data: {
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

const getHasilBidang = async (riwayatId: string) => {
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

const saveHasilJurusan = async (data: {
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
    include: { jurusan: { select: { nama_jurusan: true } } },
  });
};

const saveHasilKampus = async (data: {
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
    include: { kampus: { select: { nama_kampus: true } } },
  });
};

const findAllBidang = async () => {
  return await prisma.bidang.findMany({
    orderBy: { nama_bidang: "asc" },
  });
};

const findBidangById = async (bidangId: string) => {
  return await prisma.bidang.findUnique({
    where: { bidang_id: bidangId },
  });
};

const findJurusanByBidang = async (bidangId: string) => {
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

const findCampusByJurusan = async (jurusanIds: string[]) => {
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

const submitAnswersBatch = async (
  riwayat_id: string,
  answers: Array<{ pertanyaan_id: string; jawaban_id: string }>
) => {
  return await prisma.$transaction(
    answers.map(({ pertanyaan_id, jawaban_id }) =>
      prisma.jawabanUser.upsert({
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
      })
    )
  );
};

const countHasilJurusan = async (riwayat_id: string) => {
  return await prisma.hasilJurusan.count({
    where: { riwayat_id }
  });
};

export default {
  submitAnswersBatch,
  findActiveQuiz,
  findQuizById,
  startQuiz,
  findAllQuestion,
  findQuestionByType,
  findQuestionById,
  submitAnswer,
  findHistoryId,
  findHistoryById,
  findUserHistory,
  updateRiwayatStatus,
  setUsedTieBreaker,
  countJawabanByRiwayat,
  saveHasilBidang,
  getHasilBidang,
  saveHasilJurusan,
  saveHasilKampus,
  findAllBidang,
  findBidangById,
  findJurusanByBidang,
  findCampusByJurusan,
  countHasilJurusan, 
};