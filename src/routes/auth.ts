// Imports.
import express, { type Router, type Response, type Request } from "express";

// Controllers.
import { registerationController } from "../controllers/authController";

const router: Router = express.Router();

router.post("/register", registerationController);

export default router;
