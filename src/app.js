import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
const app = express();

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// Test route (just to check server)
app.get("/", (req, res) => {
  res.send("Server is running ");
});

app.use("/api/auth", authRouter);

export default app;
