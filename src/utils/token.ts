import jwt from "jsonwebtoken"

interface UserPayload {
  user_id: string;
  email: string;
  role: string;
}

export const generateTokens = (user: UserPayload) => {
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