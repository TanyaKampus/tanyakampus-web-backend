import majorService from "./major.service";
import { Request, Response } from "express";

const createMajor = async (req: Request, res: Response) => {
  try {
    const major = req.body;

    const result = await majorService.createMajor(major);

    return res.status(201).json({
      success: true,
      message: "Major created successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllMajor = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 9

    const result = await majorService.getAllMajor(page, limit);

    if (!result) {
      return res.status(404).json({
        message: "Major not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Data retrieved successfully",
      data: result.data,
      meta: result.meta,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getMajorById = async (req: Request, res: Response) => {
  try {
    const jurusan_id = req.params.id;

    if (!jurusan_id) {
      return res.status(404).json({
        message: "Missing major ID parameter",
      });
    }

    const major = await majorService.getMajorById(jurusan_id);

    return res.status(200).json({
      success: true,
      message: "Data retrieved successfully",
      data: major,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateMajor = async (req: Request, res: Response) => {
  try {
    const jurusan_id = req.params.id;
    const data = req.body;

    if (!jurusan_id) {
      return res.status(400).json({
        message: "Missing major ID parameter",
      });
    }

    const major = await majorService.updateMajor(jurusan_id, data);

    return res.status(200).json({
      success: true,
      message: "Major successfully updated",
      data: major,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteMajor = async (req: Request, res: Response) => {
  try {
    const jurusan_id = req.params.id;

    if (!jurusan_id) {
      return res.status(400).json({
        message: "Missing major ID parameter",
      });
    }

    const result = await majorService.deleteMajor(jurusan_id);

    if (!result) {
      return res.status(404).json({
        message: "Major not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Major successfully deleted",
      result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default {
  createMajor,
  getAllMajor,
  getMajorById,
  updateMajor,
  deleteMajor,
};
