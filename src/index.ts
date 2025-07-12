import express, { Application, Request, Response } from "express";
import "dotenv/config";
const app: Application = express();
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).json({ message: "success" });
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
