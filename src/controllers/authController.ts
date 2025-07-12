// Imports.
import { Request, Response } from "express";
import z from "zod";
import User from "../models/User";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";

// Building zod schemas for simple data validations.
const email = z.email();
const name = z.string().trim().min(3).max(20);
const password = z.string().min(6).max(30);

const registerReqData = z.object({
  name,
  email,
  password,
});

const loginReqData = z.object({
  email,
  password,
});

// Controller for User Registration.
export async function registerationController(req: Request, res: Response) {
  try {
    const result = registerReqData.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
        errors: result.error.flatten().fieldErrors,
      });
    }

    const { data } = result;

    const userExists = await User.findOne({ email: data.email });

    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "User Already Exists" });
    }

    const passwordHash = await hash(
      data.password,
      Number.parseInt(process.env.PASSWORD_SALT!)
    );

    const newUser = await User.create({ ...data, password: passwordHash });

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      data: {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        token,
      },
    });
  } catch {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// Controller for Login.
export async function loginController(req: Request, res: Response) {
  try {
    const result = loginReqData.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
        errors: result.error.flatten().fieldErrors,
      });
    }

    const { data } = result;

    const user = await User.findOne({ email: data.email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const isCorrectPassword = await compare(data.password, user.password);

    if (!isCorrectPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      data: {
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      },
    });
  } catch {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
