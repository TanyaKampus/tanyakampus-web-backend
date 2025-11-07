import authRepository from "./auth.repository";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";

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
    throw new Error("Missing JWT secret(s) in environment variables");
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

const register = async (email: string, password: string) => {
  const existingUser = await authRepository.findUserByEmail(email);

  if (existingUser) throw new Error("Email already used");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await authRepository.createUser({
    email,
    password: hashedPassword,
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
    message: "Logout successfull"
  }
}

const getProfile = async (user_id : string) => {
  const user = await authRepository.findUserById(user_id)

  if (!user) throw new Error ("User not found")

  const { password, ...safeUser} = user;
  return safeUser;
}

export default {
  register,
  login,
  refreshAccessToken,
  logout,
  getProfile
};
