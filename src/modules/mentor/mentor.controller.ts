// src/modules/mentor/mentor.controller.ts
import { Request, Response } from "express";
import mentorService from "./mentor.service";

const createMentor = async (req: Request, res: Response) => {
  try {
    const { nama_mentor, pendidikan, keahlian, foto_mentor, logo_kampus } = req.body;

    // Validation
    if (!nama_mentor || !pendidikan || !keahlian) {
      return res.status(400).json({
        success: false,
        message: "nama_mentor, pendidikan, dan keahlian harus diisi",
      });
    }

    const mentor = await mentorService.createMentor({
      nama_mentor,
      pendidikan,
      keahlian,
      logo_kampus,
      foto_mentor,
    });

    return res.status(201).json({
      success: true,
      message: "Mentor created successfully",
      data: mentor,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllMentor = async (req: Request, res: Response) => {
  try {
    const data = await mentorService.getAllMentor();

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Mentor not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Data retrieved successfully",
      data,
      total: data.length,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMentorById = async (req: Request, res: Response) => {
  try {
    const mentor_id = req.params.id;

    if (!mentor_id) {
      return res.status(400).json({
        success: false,
        message: "Missing mentor ID parameter",
      });
    }

    const mentor = await mentorService.getMentorById(mentor_id);

    return res.status(200).json({
      success: true,
      message: "Data retrieved successfully",
      data: mentor,
    });
  } catch (error: any) {
    if (error.message === "Mentor not found") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateMentor = async (req: Request, res: Response) => {
  try {
    const mentor_id = req.params.id;
    const data = req.body;

    if (!mentor_id) {
      return res.status(400).json({
        success: false,
        message: "Missing mentor ID parameter",
      });
    }

    const mentor = await mentorService.updateMentor(mentor_id, data);

    return res.status(200).json({
      success: true,
      message: "Mentor successfully updated",
      data: mentor,
    });
  } catch (error: any) {
    if (error.message === "Mentor not found") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteMentor = async (req: Request, res: Response) => {
  try {
    const mentor_id = req.params.id;

    if (!mentor_id) {
      return res.status(400).json({
        success: false,
        message: "Missing mentor ID parameter",
      });
    }

    const result = await mentorService.deleteMentor(mentor_id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Mentor not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Mentor successfully deleted",
      data: result,
    });
  } catch (error: any) {
    if (error.message === "Mentor not found") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default {
  createMentor,
  getAllMentor,
  getMentorById,
  updateMentor,
  deleteMentor,
};
