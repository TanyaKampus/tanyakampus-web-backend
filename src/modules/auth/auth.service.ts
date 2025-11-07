const authRepository = require("./auth.repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


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






const register = async (email: String, password: String) => {
  const existingUser = await authRepository.findUserByEmail(email);

  if (existingUser) throw new Error("Email sudah digunakan");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await authRepository.createUser({
    email,
    password: hashedPassword,
  });

  return {
    id: user.user_id,
    email: user.email,
    role: user.role,
  };
};

const login = async (email: String, password: String) => {
  const user = await authRepository.findUserByEmail(email);

  if (!user) throw new Error("Email tidak ditemukan");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error("Email atau password salah");

  return {
    id: user.user_id,
    email: user.email,
  };
};

module.exports = {
  register,
  login,
};
