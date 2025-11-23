import majorController from "./major.controller";
import express from "express";

const router = express.Router();

router.get("/", majorController.getAllMajor);
router.get("/:id", majorController.getMajorById);
router.post("/", majorController.createMajor);
router.put("/:id", majorController.updateMajor);
router.delete("/:id", majorController.deleteMajor)

export default router;
