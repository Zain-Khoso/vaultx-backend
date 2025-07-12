// Imports/
import mongoose, { Schema } from "mongoose";

export type TUser = {
  name: string;
  email: string;
  password: string;
  role: "admin" | "viewer";
};

const UserSchema: Schema<TUser> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["admin", "viewer"],
      default: "viewer",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<TUser>("User", UserSchema);

export default User;
