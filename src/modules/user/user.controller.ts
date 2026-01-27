import userService from "./user.service";
import { Request, Response } from "express";
import { Prisma } from "@prisma/client";

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

    console.log("req.body:", req.body);

    const {
      nama,
      jenis_kelamin,
      tanggal_lahir,
      foto_profil,
      no_telepon,
      asal_sekolah,
    } = req.body;

    const updateData: any = {
      ...(nama && { nama }),
      ...(jenis_kelamin && { jenis_kelamin }),
      ...(tanggal_lahir &&
        !isNaN(new Date(tanggal_lahir).getTime()) && {
          tanggal_lahir: new Date(tanggal_lahir),
        }),
      ...(foto_profil && { foto_profil }),
      ...(no_telepon && { no_telepon }),
      ...(asal_sekolah && { asal_sekolah }),
    };

    const updatedProfile = await userService.updateProfile(user_id, updateData);

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedProfile,
    });
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({
        success: false,
        message: "Invalid request data",
        error: error.message,
      });
    }

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
