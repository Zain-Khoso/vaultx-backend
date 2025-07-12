// Lib Imports.
import express, { Application, Request, Response } from "express";
import "dotenv/config";

// Database Imports.
import { connectDB } from "./db";

// Router Imports.
import authRouter from "./routes/auth";

const app: Application = express();
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routers.
app.use("/auth", authRouter);

// Root route.
app.get("/", async (req: Request, res: Response) => {
  res.status(200).json({ message: "success" });
});

connectDB().then(() =>
  app.listen(PORT, () => {
    console.log("Server is running on port: ", PORT);
  })
);
