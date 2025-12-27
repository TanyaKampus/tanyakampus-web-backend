import express  from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser'
import cors from "cors"

dotenv.config();

import authRoutes from './modules/auth/auth.routes'
import userRoutes from "./modules/user/user.routes"
import campusRoutes from "./modules/campus/campus.routes"
import majorRoutes from "./modules/major/major.routes"
import fieldRoutes from "./modules/field/field.routes"
import quizRoutes from "./modules/quiz/quiz.routes"
import favoriteRoutes from "./modules/favorites/favorite.routes"
import mentorRoutes from "./modules/mentor/mentor.routes"
// import quizv2Routes from "./modules/quiz/v2/quiz.routes"

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173","https://tanyakampus.vercel.app"],
    credentials: true, 
  })
);

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/campus", campusRoutes)
app.use("/api/major", majorRoutes)
app.use("/api/field", fieldRoutes)
app.use("/api/quiz", quizRoutes)
app.use("/api/favorite", favoriteRoutes)
app.use("/api/mentor", mentorRoutes)
// app.use("/api/v2/quiz", quizv2Routes)


export default app


