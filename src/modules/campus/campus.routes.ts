import express from "express"
import campusController from "./campus.controller"


const router = express.Router();

router.get("/", campusController.getAllCampus);


export default router;