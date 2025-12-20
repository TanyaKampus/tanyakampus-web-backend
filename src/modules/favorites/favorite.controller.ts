// src/controllers/favorite.controller.ts
import { Response } from "express";
import { AuthenticatedRequest } from "../../middleware/auth";
import favoriteService from "./favorite.service";

// ==================== KAMPUS ====================
const addFavoriteKampus = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { kampus_id } = req.body;

    if (!kampus_id) {
      return res.status(400).json({
        success: false,
        message: "kampus_id harus diisi",
      });
    }

    const favorite = await favoriteService.addFavoriteKampus(
      req.user!.user_id,
      kampus_id
    );

    return res.status(201).json({
      success: true,
      message: "Kampus berhasil ditambahkan ke favorit",
      data: favorite,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const removeFavoriteKampus = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const kampus_id = req.params.id;

    if (!kampus_id) {
      return res.status(400).json({
        success: false,
        message: "Missing kampus ID parameter",
      });
    }

    await favoriteService.removeFavoriteKampus(req.user!.user_id, kampus_id);

    return res.status(200).json({
      success: true,
      message: "Kampus berhasil dihapus dari favorit",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getFavoriteKampus = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const favorites = await favoriteService.getFavoriteKampusByUser(
      req.user!.user_id
    );

    return res.status(200).json({
      success: true,
      message: "Data retrieved successfully",
      data: favorites,
      total: favorites.length,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==================== JURUSAN ====================
const addFavoriteJurusan = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { jurusan_id } = req.body;

    if (!jurusan_id) {
      return res.status(400).json({
        success: false,
        message: "jurusan_id harus diisi",
      });
    }

    const favorite = await favoriteService.addFavoriteJurusan(
      req.user!.user_id,
      jurusan_id
    );

    return res.status(201).json({
      success: true,
      message: "Jurusan berhasil ditambahkan ke favorit",
      data: favorite,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const removeFavoriteJurusan = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const jurusan_id = req.params.id;

    if (!jurusan_id) {
      return res.status(400).json({
        success: false,
        message: "Missing jurusan ID parameter",
      });
    }

    await favoriteService.removeFavoriteJurusan(req.user!.user_id, jurusan_id);

    return res.status(200).json({
      success: true,
      message: "Jurusan berhasil dihapus dari favorit",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getFavoriteJurusan = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const favorites = await favoriteService.getFavoriteJurusanByUser(
      req.user!.user_id
    );

    return res.status(200).json({
      success: true,
      message: "Data retrieved successfully",
      data: favorites,
      total: favorites.length,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==================== MENTOR ====================
const addFavoriteMentor = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { mentor_id } = req.body;

    if (!mentor_id) {
      return res.status(400).json({
        success: false,
        message: "mentor_id harus diisi",
      });
    }

    const favorite = await favoriteService.addFavoriteMentor(
      req.user!.user_id,
      mentor_id
    );

    return res.status(201).json({
      success: true,
      message: "Mentor berhasil ditambahkan ke favorit",
      data: favorite,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const removeFavoriteMentor = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const mentor_id = req.params.id;

    if (!mentor_id) {
      return res.status(400).json({
        success: false,
        message: "Missing mentor ID parameter",
      });
    }

    await favoriteService.removeFavoriteMentor(req.user!.user_id, mentor_id);

    return res.status(200).json({
      success: true,
      message: "Mentor berhasil dihapus dari favorit",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getFavoriteMentor = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const favorites = await favoriteService.getFavoriteMentorByUser(
      req.user!.user_id
    );

    return res.status(200).json({
      success: true,
      message: "Data retrieved successfully",
      data: favorites,
      total: favorites.length,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default {
  // Kampus
  addFavoriteKampus,
  removeFavoriteKampus,
  getFavoriteKampus,

  // Jurusan
  addFavoriteJurusan,
  removeFavoriteJurusan,
  getFavoriteJurusan,

  // Mentor
  addFavoriteMentor,
  removeFavoriteMentor,
  getFavoriteMentor,
};
