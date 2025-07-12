// Imports.
import express, { Router } from "express";

// Controllers.
import {
  registerationController,
  loginController,
} from "../controllers/authController";

const router: Router = express.Router();

router.post("/register", registerationController);

router.post("/login", loginController);

export default router;
