import express from "express";
import campusController from "./campus.controller";

const router = express.Router();

router.get("/", campusController.getAllCampus);
router.get("/:id", campusController.getCampusById);
router.post("/", campusController.createCampus);
router.put("/:id", campusController.updateCampus);
router.delete("/:id", campusController.deleteCampus);

export default router;
