import mongoose, { Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { TUser } from "./user.interface";
require("dotenv").config();
const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new mongoose.Schema<TUser>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      validate: {
        validator: function (email: string) {
          return emailRegex.test(email);
        },
        message: "please enter a valid email",
      },
      unique: true,
    },
    password: {
      type: String,
      required: [true, "please enter your password"],
      minlength: 6,
    },
    avatar: String,
    role: { type: String, default: "user" },
    courses: [],
  },
  { timestamps: true }
);

// ! hashing user password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const UserModel: Model<TUser> = mongoose.model("User", userSchema);

export default UserModel;
