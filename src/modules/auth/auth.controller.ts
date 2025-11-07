const authService = require("./auth.service");
import type { Request, Response } from "express";

const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await authService.register(email, password);

    res.status(200).json({
      message: "User created successfully",
      user,
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

    const user = await authService.login(email, password)
    
    res.status(200).json({
      message: "Login success",
      user,
    })
    
  } catch (error: any) {
    res.status(400).json({
      message: error.message
    })
  }
};

module.exports = {
  register,
  login,
};
