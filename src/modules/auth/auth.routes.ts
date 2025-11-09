import express from "express";
import authController from "./auth.controller";
import authMiddleware from "../../middleware/auth"
const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.delete("/logout", authController.logout);
router.post("/refresh-token", authController.refreshAccessToken)

router.get("/profile", authMiddleware.protectRoute ,authController.getProfile)
router.put("/profile", authMiddleware.protectRoute , authController.updateProfile)

export default router;


