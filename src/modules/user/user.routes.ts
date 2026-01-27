import express from "express"
import userController from "./user.controller"
import authMiddleware from "../../middleware/auth"
const router = express.Router();

router.get("/me", authMiddleware.protectRoute ,userController.getProfile)
router.patch( "/me", authMiddleware.protectRoute, userController.updateProfile );

export default router