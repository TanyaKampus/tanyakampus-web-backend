import userService from "./user.service";
import { Request, Response } from "express";

const getProfile = async (req: Request, res: Response) => {
  try {
    const user_id = (req as any).user?.user_id;

    if (!user_id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const profile = await userService.getProfile(user_id);

    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data: profile,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
      error: error.message,
    });
  }
};

const updateProfile = async (req: Request, res: Response) => {
  try {
    const user_id = (req as any).user?.user_id;

    if (!user_id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { nama, jenis_kelamin, tanggal_lahir, foto_profil } = req.body;

    const updatedProfile = await userService.updateProfile(user_id, {
      nama,
      jenis_kelamin,
      tanggal_lahir: new Date(tanggal_lahir),
      foto_profil,
    });

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedProfile,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
      error: error.message,
    });
  }
};

export default {
  getProfile,
  updateProfile,
};
