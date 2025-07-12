// Imports.
import { Request, Response } from "express";
import z from "zod";
import User from "../models/User";
import { hash } from "bcrypt";
import jwt from "jsonwebtoken";

// Building zod schemas for simple data validations.
const email = z.email();
const name = z.string().trim().min(3).max(20);
const password = z.string().trim().min(6).max(30);

const registerReqData = z.object({
  name,
  email,
  password,
});

// Controller for User Registration.
export async function registerationController(req: Request, res: Response) {
  const result = registerReqData.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: result.error.flatten().fieldErrors,
    });
  }

  const data = result.data;

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
}
