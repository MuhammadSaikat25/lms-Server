import bcrypt from "bcryptjs";
import { TUser } from "./user.interface";
import UserModel from "./user.model";
import jwt from "jsonwebtoken";
import { ErrorHandler } from "../../utils/ErrorHandler";
import { purchaseCourseModel } from "../purchase-course/purchaseCourder.model";
require("dotenv").config();

const registrationUser = async (playLoad: TUser) => {
  const result = await UserModel.create(playLoad);
  await purchaseCourseModel.create({
    userId: playLoad.email,
    courses: [],
  });
  return result;
};
const loginUser = async (playLoad: { email: string; password: string }) => {
  const userExist = await UserModel.findOne({ email: playLoad.email });
  if (!userExist) {
    return;
  }

  const comparePassword = await bcrypt.compare(
    playLoad.password,
    userExist.password
  );

  if (!comparePassword) {
    return "Password does not match";
  }

  const jwtPlayLoad = {
    _id: userExist._id,
    email: userExist.email,
    role: userExist.role,
    name: userExist.name,
    avatar: userExist?.avatar,
  };
  const token = jwt.sign(jwtPlayLoad, process.env.ACCESS_TOKEN as string, {
    expiresIn: "7d",
  });
  const data = {
    userId: userExist._id,
    courses: [],
  };
  // ! when user login for first time then it create empty data
  await purchaseCourseModel.create(data);
  return token;
};

const updateUser = async (playLoad: Partial<TUser> | any, email: string) => {
  try {
    const user = await UserModel.findOne({ email: playLoad.email });
    if (!user) {
      throw new Error("User not found");
    }

    const comparePassword = await bcrypt.compare(
      playLoad.password,
      user.password
    );

    if (!comparePassword) {
      return;
    }
    console.log(comparePassword);
    const { newPass, _id, password, ...filteredPlayLoad } = playLoad;
    const updateData = await UserModel.findOneAndUpdate(
      { email: playLoad.email },
      filteredPlayLoad,
      {
        new: true,
      }
    );
    return updateData;
  } catch (error) {
    console.error("Error in updateUser:", error);
  }
};

const updatePassword = async (
  playLoad: { password: string; newPassword: string },
  email: string
) => {
  const findUser = await UserModel.findOne({ email });
  if (!findUser) {
    return;
  }
  const comparePassword = await bcrypt.compare(
    playLoad.password,
    findUser.password
  );
  if (!comparePassword) {
    throw new Error("Password does't match");
  }
  const result = await UserModel.findOneAndUpdate(
    { email },
    { password: playLoad.newPassword },
    { new: true }
  );
  return result;
};

const updateUserRoleByAdmin = async (email: string, role: string) => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new ErrorHandler("User does't found", 400);
  }
  const result = await UserModel.findOneAndUpdate(
    { email },
    { role },
    { new: true }
  );

  return result;
};

const deleteUser = async (id: string) => {
  const isUSerExits = UserModel.findById(id);
  if (!isUSerExits) {
    return new ErrorHandler("user does not exits", 400);
  }
  const result = await UserModel.findByIdAndDelete(id);
  return result;
};
export const userService = {
  registrationUser,
  loginUser,
  updateUser,
  updatePassword,
  updateUserRoleByAdmin,
  deleteUser,
};
