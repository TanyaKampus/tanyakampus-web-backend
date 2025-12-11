import fieldController from "./field.controller"
import express from "express"

const router = express.Router()

router.post("/", fieldController.createField)
router.get("/", fieldController.getAllFields)
router.get("/:id", fieldController.getFieldById)
router.patch("/:id", fieldController.updateField)
router.delete("/:id", fieldController.deleteField)



export default router
