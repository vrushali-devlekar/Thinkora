import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Test route (just to check server)
app.get("/", (req, res) => {
  res.send("Server is running ");
});

export default app;
