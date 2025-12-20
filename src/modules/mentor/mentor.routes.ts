// src/modules/mentor/mentor.routes.ts
import express from "express";
import mentorController from "./mentor.controller";
import authMiddleware from "../../middleware/auth";

const router = express.Router();


router.get("/", mentorController.getAllMentor);
router.get("/:id", mentorController.getMentorById);


router.post(
  "/",
  authMiddleware.protectRoute,
  authMiddleware.adminRoute,
  mentorController.createMentor
);

router.patch(
  "/:id",
  authMiddleware.protectRoute,
  authMiddleware.adminRoute,
  mentorController.updateMentor
);

router.delete(
  "/:id",
  authMiddleware.protectRoute,
  authMiddleware.adminRoute,
  mentorController.deleteMentor
);

export default router;
