import express, { Application, Request, Response } from "express";
import "dotenv/config";
import { connectDB } from "./db";

const app: Application = express();
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  res.status(200).json({ message: "success" });
});

connectDB().then(() =>
  app.listen(PORT, () => {
    console.log("Server is running on port: ", PORT);
  })
);
