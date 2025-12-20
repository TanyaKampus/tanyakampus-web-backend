// src/repositories/favorite.repository.ts
import prisma from "../../config/prisma";

// ==================== KAMPUS ====================
const addFavoriteKampus = async (user_id: string, kampus_id: string) => {
  return await prisma.favoriteKampus.create({
    data: {
      user_id,
      kampus_id,
    },
    include: {
      kampus: true,
    },
  });
};

const removeFavoriteKampus = async (user_id: string, kampus_id: string) => {
  return await prisma.favoriteKampus.delete({
    where: {
      user_id_kampus_id: {
        user_id,
        kampus_id,
      },
    },
  });
};

const getFavoriteKampusByUser = async (user_id: string) => {
  return await prisma.favoriteKampus.findMany({
    where: { user_id },
    include: {
      kampus: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const checkFavoriteKampusExists = async (
  user_id: string,
  kampus_id: string
) => {
  const favorite = await prisma.favoriteKampus.findUnique({
    where: {
      user_id_kampus_id: {
        user_id,
        kampus_id,
      },
    },
  });
  return favorite !== null;
};

// ==================== JURUSAN ====================
const addFavoriteJurusan = async (user_id: string, jurusan_id: string) => {
  return await prisma.favoriteJurusan.create({
    data: {
      user_id,
      jurusan_id,
    },
    include: {
      jurusan: {
        include: {
          bidang: {
            select: {
              nama_bidang: true,
            },
          },
        },
      },
    },
  });
};

const removeFavoriteJurusan = async (user_id: string, jurusan_id: string) => {
  return await prisma.favoriteJurusan.delete({
    where: {
      user_id_jurusan_id: {
        user_id,
        jurusan_id,
      },
    },
  });
};

const getFavoriteJurusanByUser = async (user_id: string) => {
  return await prisma.favoriteJurusan.findMany({
    where: { user_id },
    include: {
      jurusan: {
        include: {
          bidang: {
            select: {
              nama_bidang: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const checkFavoriteJurusanExists = async (
  user_id: string,
  jurusan_id: string
) => {
  const favorite = await prisma.favoriteJurusan.findUnique({
    where: {
      user_id_jurusan_id: {
        user_id,
        jurusan_id,
      },
    },
  });
  return favorite !== null;
};

// ==================== MENTOR ====================
const addFavoriteMentor = async (user_id: string, mentor_id: string) => {
  return await prisma.favoriteMentor.create({
    data: {
      user_id,
      mentor_id,
    },
    include: {
      mentor: true,
    },
  });
};

const removeFavoriteMentor = async (user_id: string, mentor_id: string) => {
  return await prisma.favoriteMentor.delete({
    where: {
      user_id_mentor_id: {
        user_id,
        mentor_id,
      },
    },
  });
};

const getFavoriteMentorByUser = async (user_id: string) => {
  return await prisma.favoriteMentor.findMany({
    where: { user_id },
    include: {
      mentor: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const checkFavoriteMentorExists = async (
  user_id: string,
  mentor_id: string
) => {
  const favorite = await prisma.favoriteMentor.findUnique({
    where: {
      user_id_mentor_id: {
        user_id,
        mentor_id,
      },
    },
  });
  return favorite !== null;
};

// ==================== VERIFICATION ====================
const verifyKampusExists = async (kampus_id: string) => {
  const kampus = await prisma.kampus.findUnique({
    where: { kampus_id },
  });
  return kampus !== null;
};

const verifyJurusanExists = async (jurusan_id: string) => {
  const jurusan = await prisma.jurusan.findUnique({
    where: { jurusan_id },
  });
  return jurusan !== null;
};

const verifyMentorExists = async (mentor_id: string) => {
  const mentor = await prisma.mentor.findUnique({
    where: { mentor_id },
  });
  return mentor !== null;
};

export default {
  // Kampus
  addFavoriteKampus,
  removeFavoriteKampus,
  getFavoriteKampusByUser,
  checkFavoriteKampusExists,

  // Jurusan
  addFavoriteJurusan,
  removeFavoriteJurusan,
  getFavoriteJurusanByUser,
  checkFavoriteJurusanExists,

  // Mentor
  addFavoriteMentor,
  removeFavoriteMentor,
  getFavoriteMentorByUser,
  checkFavoriteMentorExists,

  // Verification
  verifyKampusExists,
  verifyJurusanExists,
  verifyMentorExists,
};
