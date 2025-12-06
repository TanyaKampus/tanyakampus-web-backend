import express from "express";
import authController from "./auth.controller";
import authMiddleware from "../../middleware/auth"
import { validate } from "../../middleware/validate"
import { loginSchema, registerSchema } from "./auth.schema";

const router = express.Router();


router.post("/register", validate(registerSchema), authController.register)
router.post("/login", validate(loginSchema), authController.login);
router.delete("/logout", authController.logout);
router.post("/refresh-token", authController.refreshAccessToken)

router.get("/google", authController.googleLogin);
router.get("/google/callback", authController.googleCallback)


export default router;


