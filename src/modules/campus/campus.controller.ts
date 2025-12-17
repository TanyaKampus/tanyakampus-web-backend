import campusService from "./campus.service";
import { Request, Response } from "express";

const getAllCampus = async (req: Request, res: Response) => {
  try {
    const data = await campusService.getAllCampus();
    return res.status(200).json({
      success: true,
      message: "Data retrieved successfully",
      data,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCampusById = async (req: Request, res: Response) => {
  try {
    const  kampus_id = req.params.id;

    if (!kampus_id) {
      return res.status(400).json({
        message: "Missing campus ID parameter",
      });
    }

    const campus = await campusService.getCampusById(kampus_id);

    if (!campus) {
      return res.status(404).json({
        message: "campus not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Data retrieved successfully",
      data: campus,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createCampus = async (req: Request, res: Response) => {
  try {
    const campus = req.body;

    const result = await campusService.createCampus(campus);

    res.status(201).json({
      success: true,
      message: "Campus created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateCampus = async (req: Request, res: Response) => {
  try {
    const  kampus_id  = req.params.id;
    const data = req.body;

    if (!kampus_id) {
      return res.status(400).json({
        message: "Missing campus ID parameter",
      });
    }

    const campus = await campusService.updateCampus(kampus_id, data);

    return res.status(200).json({
      success: true,
      message: "Campus successfully updated",
      data: campus,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteCampus = async (req: Request, res: Response) => {
  try {
    const  kampus_id  = req.params.id;

    if (!kampus_id) {
      return res.status(400).json({
        message: "Missing campus ID parameter",
      });
    }

    const result = await campusService.deleteCampus(kampus_id);

    if (!result) {
      return res.status(404).json({
        message: "Campus not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Campus deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete campus",
    });
  }
};

export default {
  getAllCampus,
  getCampusById,
  createCampus,
  updateCampus,
  deleteCampus,
};
