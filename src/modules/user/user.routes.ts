import express from "express";
import userController from "./user.controller";
import authMiddleware from "../../middleware/auth";
import upload from "../../config/multer";

const router = express.Router();

router.get("/me", authMiddleware.protectRoute, userController.getProfile);

router.patch(
  "/me",
  authMiddleware.protectRoute,
  upload.single("foto_profil"),
  userController.updateProfile,
);

export default router;
