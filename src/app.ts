const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser')

dotenv.config();

const authRoutes = require('./modules/auth/auth.routes')

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.use("/api/auth", authRoutes)

module.exports = app;
