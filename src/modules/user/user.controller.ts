import authService from "../auth/auth.service";
import { Request, Response } from "express";

const getProfile = async (req: Request, res: Response) => {
  try {
    const user_id = (req as any).user.user_id;

    const profile = await authService.getProfile(user_id);
    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data: profile,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: "Failed to fetched profile",
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

    const { nama, jenis_kelamin, tanggal_lahir } = req.body;

    const updatedProfile = await authService.updateProfile(user_id, {
      nama,
      jenis_kelamin,
      tanggal_lahir: new Date(tanggal_lahir),
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
}