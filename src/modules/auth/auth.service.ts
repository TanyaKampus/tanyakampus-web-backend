import authRepository from "./auth.repository";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { oauth2Client } from "../../config/google";
import { google } from "googleapis";

interface UserPayload {
  user_id: string;
  email: string;
  role: string;
}

const generateTokens = (user: UserPayload) => {
  const payload = {
    id: user.user_id,
    email: user.email,
    role: user.role,
  };

  if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
    throw new Error("Missing JWT secret in environment variables");
  }
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign(
    { id: user.user_id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  return { refreshToken, accessToken };
};

const loginWithGoogle = async (code: string) => {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  const oauth2 = google.oauth2({
    auth: oauth2Client,
    version: "v2",
  });

  const { data } = await oauth2.userinfo.get();

  if (!data.email) throw new Error("Failed to retrieve google account data");

  let user = await authRepository.findUserByEmail(data.email);

  if (!user) {
    user = await authRepository.createUser({
      email: data.email,
      password: "GOOGLE_AUTH",
      profile: {
        create: {
          nama: data.name || "",
          jenis_kelamin: "",
          tanggal_lahir: null,
        },
      },
    });
  }

  const { refreshToken, accessToken } = generateTokens(user);

  return { refreshToken, accessToken, user };
};

const register = async (email: string, password: string) => {
  const existingUser = await authRepository.findUserByEmail(email);

  if (existingUser) throw new Error("Email already used");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await authRepository.createUser({
    email,
    password: hashedPassword,
    profile: {
      create: {
        nama: "",
        jenis_kelamin: "",
        tanggal_lahir: null,
      },
    },
  });

  const { refreshToken, accessToken } = generateTokens(user);

  return {
    user: {
      id: user.user_id,
      email: user.email,
      role: user.role,
    },
    accessToken,
    refreshToken,
  };
};

const login = async (email: string, password: string) => {
  const user = await authRepository.findUserByEmail(email);

  if (!user) throw new Error("Email not found");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error("Email or password incorrect");

  const { accessToken, refreshToken } = generateTokens(user);

  return {
    user: {
      id: user.user_id,
      email: user.email,
    },
    accessToken,
    refreshToken,
  };
};

const refreshAccessToken = async (refreshToken: string) => {
  if (!refreshToken) throw new Error("No refresh token provided");

  if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
    throw new Error("Missing JWT secret(s) in environment variables");
  }

  const decoded = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET
  ) as JwtPayload;

  const accessToken = jwt.sign(
    { id: decoded.id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  return accessToken;
};

const logout = (user_id: string) => {
  return {
    message: "Logout successfull",
  };
};

const getProfile = async (user_id: string) => {
  const user = await authRepository.findUserById(user_id);

  if (!user) throw new Error("User not found");

  const { password, ...safeUser } = user;
  return safeUser;
};

const updateProfile = async (
  user_id: string,
  data: {
    nama: string;
    jenis_kelamin: string;
    tanggal_lahir: Date;
  }
) => {
  const existingProfile = await authRepository.findProfileById(user_id);

  if (!existingProfile) throw new Error("Profile not found");

  const updatedProfile = await authRepository.updateProfile(user_id, data);

  return updatedProfile;
};

export default {
  register,
  login,
  refreshAccessToken,
  logout,
  getProfile,
  updateProfile,
  loginWithGoogle,
};
