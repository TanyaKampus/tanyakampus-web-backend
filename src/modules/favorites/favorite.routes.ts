// src/routes/favorite.routes.ts
import express from "express";
import favoriteController from "./favorite.controller";
import  authMiddleware  from "../../middleware/auth";

const router = express.Router();

router.use(authMiddleware.protectRoute);

// ==================== KAMPUS ROUTES ====================
router.get(
  "/campus",
  authMiddleware.protectRoute,
  favoriteController.getFavoriteKampus
);
router.post(
  "/campus",
  authMiddleware.protectRoute,
  favoriteController.addFavoriteKampus
);
router.delete(
  "/campus/:id",
  authMiddleware.protectRoute,
  favoriteController.removeFavoriteKampus
);

// ==================== JURUSAN ROUTES ====================
router.get(
  "/major",
  authMiddleware.protectRoute,
  favoriteController.getFavoriteJurusan
);
router.post(
  "/major",
  authMiddleware.protectRoute,
  favoriteController.addFavoriteJurusan
);
router.delete(
  "/major/:id",
  authMiddleware.protectRoute,
  favoriteController.removeFavoriteJurusan
);

// ==================== MENTOR ROUTES ====================
router.get(
  "/mentor",
  authMiddleware.protectRoute,
  favoriteController.getFavoriteMentor
);
router.post(
  "/mentor",
  authMiddleware.protectRoute,
  favoriteController.addFavoriteMentor
);
router.delete(
  "/mentor/:id",
  authMiddleware.protectRoute,
  favoriteController.removeFavoriteMentor
);

export default router;
