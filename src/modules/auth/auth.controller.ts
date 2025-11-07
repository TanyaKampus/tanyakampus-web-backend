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

const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const { user, accessToken, refreshToken } = await authService.register(
      email,
      password
    );

    setCookies(res, accessToken, refreshToken);

    res.status(200).json({
      status: "success",
      message: "User created successfully",
      user,
    });
  } catch (error: any) {
    res.status(400).json({
      status: "error",
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
      user,
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

    res.cookie("accesToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });
    
    res.json({
      message: "Token refreshed successfully"
    })
  } catch (error:any) {

    res.status(400).json({
      message: error.message
    })

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
      status: error,
      message: error.message,
    });
  }
};

export default {
  register,
  login,
  logout,
};
