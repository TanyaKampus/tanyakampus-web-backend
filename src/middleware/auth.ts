import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import authRepository from "../modules/auth/auth.repository";

export interface AuthenticatedRequest extends Request {
  user?: Record<string, any>;
}
const protectRoute = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.cookies?.accessToken;

    if (!accessToken) {
      return res.status(401).json({
        message: "Unauthorized - No access token provided",
      });
    }

    if (!process.env.ACCESS_TOKEN_SECRET) {
      throw new Error("Missing ACCESS_TOKEN_SECRET in environment variables");
    }

    const decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    ) as JwtPayload;

    if (!decoded.id) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    const user = await authRepository.findUserById(decoded.id);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

   const { password, ...safeUser } = user;
   req.user = safeUser;

    next();
  } catch (error: any) {
    console.error("Auth middleware error", error)

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Unauthorized - Access token expired",
      });
    }
    return res.status(401).json({
      message: "Unauthorized - Invalid token",
      error: error.message,
    });
  }
};

const adminRoute = (req: AuthenticatedRequest, res:Response, next:NextFunction) => {
    if (req.user && req.user.role === "ADMIN") {
        next()
    } else {
        return res.status(403).json({
            message: "Access denied - admin only"
        })
    }
}

export default {
    protectRoute,
    adminRoute
}