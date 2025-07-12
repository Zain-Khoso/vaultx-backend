// Lib Imports.
import express, { Application, Request, Response } from "express";
import "dotenv/config";

// Local Imports.
import { connectDB } from "./db";
import authRouter from "./routes/auth";
import { authenticate } from "./middleware/auth";

const app: Application = express();
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routers.
app.use("/auth", authRouter);

// Root route.
app.get("/", authenticate, async (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "User is Authenticated." });
});

connectDB().then(() =>
  app.listen(PORT, () => {
    console.log("Server is running on port: ", PORT);
  })
);
