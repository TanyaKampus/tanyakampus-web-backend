import { oauth2Client, scopes } from "../../config/google";
import authService from "./auth.service";
import { Request, Response } from "express";

const setCookies = async (
  res: Response,
  accessToken: string,
  refreshToken: string
) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
    path: "/",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

const googleLogin = (req: Request, res: Response) => {
  const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    include_granted_scopes: true,
  });
  res.redirect(authorizationUrl);
};

const googleCallback = async (req: Request, res: Response) => {
  try {
    const { code } = req.query;

    if (!code)
      return res.status(400).json({
        message: "Missing authorization code",
      });

    const { user, accessToken, refreshToken } =
      await authService.loginWithGoogle(code as string);

    setCookies(res, accessToken, refreshToken);

    // res.redirect(`https://tanyakampus.vercel.app/`); redirect to frontend

    res.json({
      status: "success",
      message: "Logged in with google",
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to login with google,",
      error: error.message,
    });
  }
};

const register = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const tempUser = await authService.register(email);

    res.status(200).json(tempUser);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const registerDetails = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new Error("JWT must be provided");

    const token = authHeader.split(" ")[1];
    const { password, nama, asal_sekolah, jenis_kelamin, no_telepon } =
      req.body;

    if (!token) throw new Error("Invalid token");

    const data = await authService.registerDetails(token, {
      password,
      nama,
      no_telepon,
      asal_sekolah,
      jenis_kelamin,
    });

    const { accessToken, refreshToken } = data;

    setCookies(res, accessToken, refreshToken);

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      data,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const { user, accessToken, refreshToken } = await authService.login(
      email,
      password
    );

    setCookies(res, accessToken, refreshToken);

    res.status(200).json({
      status: "success",
      message: "Login success",
      data: user,
    });
  } catch (error: any) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const refreshAccessToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const accessToken = await authService.refreshAccessToken(refreshToken);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.json({
      message: "Token refreshed successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    await authService.logout(refreshToken);

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.json({
      status: "success",
      message: "Logged Out successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const getProfile = async (req: Request, res: Response) => {
  try {
    const user_id = (req as any).user.user_id;

    const profile = await authService.getProfile(user_id);
    return res.status(200).json({
      status: "success",
      message: "Profile fetched successfully",
      data: profile,
    });
  } catch (error: any) {
    res.status(400).json({
      status: "error",
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
      status: "success",
      message: "Profile updated successfully",
      data: updatedProfile,
    });
  } catch (error: any) {
    return res.status(500).json({
      status: "error",
      message: "Failed to update profile",
      error: error.message,
    });
  }
};

export default {
  register,
  registerDetails,
  login,
  refreshAccessToken,
  logout,
  getProfile,
  updateProfile,
  googleLogin,
  googleCallback,
};
