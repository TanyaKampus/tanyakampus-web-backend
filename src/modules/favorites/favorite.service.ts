// src/services/favorite.service.ts
import favoriteRepository from "./favorite.repository";

// ==================== KAMPUS ====================
const addFavoriteKampus = async (user_id: string, kampus_id: string) => {
  // Cek duplicate aja, foreign key validation handled by Prisma
  const alreadyFavorited = await favoriteRepository.checkFavoriteKampusExists(
    user_id,
    kampus_id
  );
  if (alreadyFavorited) {
    throw new Error("Kampus sudah ada di favorit");
  }

  // Prisma akan throw error kalau kampus_id ga valid
  return await favoriteRepository.addFavoriteKampus(user_id, kampus_id);
};

const removeFavoriteKampus = async (user_id: string, kampus_id: string) => {
  const exists = await favoriteRepository.checkFavoriteKampusExists(
    user_id,
    kampus_id
  );
  if (!exists) {
    throw new Error("Kampus tidak ada di favorit");
  }

  return await favoriteRepository.removeFavoriteKampus(user_id, kampus_id);
};

const getFavoriteKampusByUser = async (user_id: string) => {
  return await favoriteRepository.getFavoriteKampusByUser(user_id);
};

// ==================== JURUSAN ====================
const addFavoriteJurusan = async (user_id: string, jurusan_id: string) => {
  const jurusanExists = await favoriteRepository.verifyJurusanExists(
    jurusan_id
  );
  if (!jurusanExists) {
    throw new Error("Jurusan tidak ditemukan");
  }

  const alreadyFavorited = await favoriteRepository.checkFavoriteJurusanExists(
    user_id,
    jurusan_id
  );
  if (alreadyFavorited) {
    throw new Error("Jurusan sudah ada di favorit");
  }

  return await favoriteRepository.addFavoriteJurusan(user_id, jurusan_id);
};

const removeFavoriteJurusan = async (user_id: string, jurusan_id: string) => {
  const exists = await favoriteRepository.checkFavoriteJurusanExists(
    user_id,
    jurusan_id
  );
  if (!exists) {
    throw new Error("Jurusan tidak ada di favorit");
  }

  return await favoriteRepository.removeFavoriteJurusan(user_id, jurusan_id);
};

const getFavoriteJurusanByUser = async (user_id: string) => {
  return await favoriteRepository.getFavoriteJurusanByUser(user_id);
};

// ==================== MENTOR ====================
const addFavoriteMentor = async (user_id: string, mentor_id: string) => {
  const mentorExists = await favoriteRepository.verifyMentorExists(mentor_id);
  if (!mentorExists) {
    throw new Error("Mentor tidak ditemukan");
  }

  const alreadyFavorited = await favoriteRepository.checkFavoriteMentorExists(
    user_id,
    mentor_id
  );
  if (alreadyFavorited) {
    throw new Error("Mentor sudah ada di favorit");
  }

  return await favoriteRepository.addFavoriteMentor(user_id, mentor_id);
};

const removeFavoriteMentor = async (user_id: string, mentor_id: string) => {
  const exists = await favoriteRepository.checkFavoriteMentorExists(
    user_id,
    mentor_id
  );
  if (!exists) {
    throw new Error("Mentor tidak ada di favorit");
  }

  return await favoriteRepository.removeFavoriteMentor(user_id, mentor_id);
};

const getFavoriteMentorByUser = async (user_id: string) => {
  return await favoriteRepository.getFavoriteMentorByUser(user_id);
};

export default {
  // Kampus
  addFavoriteKampus,
  removeFavoriteKampus,
  getFavoriteKampusByUser,

  // Jurusan
  addFavoriteJurusan,
  removeFavoriteJurusan,
  getFavoriteJurusanByUser,

  // Mentor
  addFavoriteMentor,
  removeFavoriteMentor,
  getFavoriteMentorByUser,
};
