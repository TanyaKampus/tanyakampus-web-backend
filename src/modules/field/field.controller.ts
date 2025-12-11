import fieldService from "./field.service";
import { Request, Response } from "express";

const createField = async (req: Request, res: Response) => {
  try {
    const field = req.body;

    const data = await fieldService.createField(field);

    return res.status(200).json({
      success: true,
      message: "Field created successfully",
      data,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllFields = async (req: Request, res: Response) => {
  try {
    const data = await fieldService.getAllFields();

    if (!data) {
      return res.status(404).json({
        message: "Field not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Data retrieved succesfully",
      data,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getFieldById = async (req: Request, res: Response) => {
  try {
    const bidang_id = req.params.id;

    if (!bidang_id) {
      return res.status(404).json({
        message: "Missing major ID parameter",
      });
    }

    const data = await fieldService.getFieldById(bidang_id);

    return res.status(200).json({
      success: true,
      message: "Data retrieved successfully",
      data,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateField = async (req: Request, res: Response) => {
  try {
    const bidang_id = req.params.id;
    const data = req.body;

    if (!bidang_id) {
      return res.status(404).json({
        message: "Missing field ID parameter",
      });
    }

    const field = await fieldService.updateField(bidang_id, data);

    return res.status(200).json({
      success: true,
      message: "Data succesfully updated",
      data: field,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default {
  createField,
  getAllFields,
  getFieldById,
  updateField,
};
