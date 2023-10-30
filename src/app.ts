import express, { NextFunction, Request, Response } from "express";
require("dotenv").config();
import morgan from "morgan";
import cors from "cors";
import BookRouter from "./routes/bookRoute";
import connectDB from './utils/connectDB';

const port = process.env.PORT;
const app = express();

// Middleware
// Body Parser
app.use(express.json({ limit: "10kb" }));

// Logger
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// Cors
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);

// Routes
app.use("/api/book", BookRouter);

// Testing
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    status: "success",
    message: "API is Up && Running 🚀🚀🚀",
  });
});

// UnKnown Routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

app.listen(port, async () => {
  console.log(`🚀 Server started on port: ${port}`);
  connectDB();
});
