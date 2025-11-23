import express  from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser'
import cors from "cors"

dotenv.config();

import authRoutes from './modules/auth/auth.routes'
import campusRoutes from "./modules/campus/campus.routes"
import majorRoutes from "./modules/major/major.routes"

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173",],
    credentials: true, 
  })
);;

app.use("/api/auth", authRoutes)
app.use("/api/campus", campusRoutes)
app.use("/api/major", majorRoutes)

export default app


