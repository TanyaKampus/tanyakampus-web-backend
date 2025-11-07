import express from "express";
import authController from "./auth.controller";
import authMiddleware from "../../middleware/auth"
const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/refreshToken", authController.refreshAccessToken)
router.post("/profile", authMiddleware.protectRoute ,authController.getProfile)

export default router;
