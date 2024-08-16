import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../../utils/catchAsyncErrors";
import UserModel from "./user.model";
import { userService } from "./user.service";
import { CourseModel } from "../course/course.model";
import { ErrorHandler } from "../../utils/ErrorHandler";

const registrationUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    // ! check user exits or not before register
    const userExist = await UserModel.findOne({ email: req.body.email });
    if (userExist) return next(new ErrorHandler("Email is already exist", 400));
    await userService.registrationUser(req.body);
    res.status(200).send({
      success: true,
      message: "Register successful",
    });
  }
);
const loginUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await userService.loginUser(req.body);
    res.cookie("token", result);
    res.status(200).json({
      success: true,
      message: result ? "login successful" : "User does't found",
      token: result,
    });
  }
);
const logOutUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    res.cookie("token", "");
    res.status(200).json({
      success: true,
      message: "logout successful",
    });
  }
);
const updateUser = catchAsyncError(
  async (req: Request & { user: any }, res: Response, next: NextFunction) => {
    try {
      const { email } = req?.user;
      const result = await userService.updateUser(req.body, email);

      res.status(200).json({
        success: result ? true : false,
        message:
          result === undefined
            ? "Password does not match"
            : "User update successful",
        data: result ? result : "Password does not match",
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 400));
    }
  }
);
const updatePassword = catchAsyncError(
  async (req: Request & { user: any }, res: Response, next: NextFunction) => {
    const userEmail = req.user.email;
    const result = await userService.updatePassword(req.body, userEmail);
    res.json({
      data: result,
    });
  }
);
// ! get all user for admin
const getAllCourseByAdmin = catchAsyncError(
  async (req: Request & { user: any }, res: Response, next: NextFunction) => {
    try {
      const result = await CourseModel.find().sort({ createdAt: -1 });
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 400));
    }
  }
);

// ! get all course for admin
const getAllUserByAdmin = catchAsyncError(
  async (req: Request & { user: any }, res: Response, next: NextFunction) => {
    try {
      const result = await UserModel.find().sort({ createdAt: -1 });
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 400));
    }
  }
);
const updateUserRoleByAdmin = catchAsyncError(
  async (req: Request & { user: any }, res: Response, next: NextFunction) => {
    try {
      const { role } = req.body;

      const result = await userService.updateUserRoleByAdmin(
        req.params.email,
        role
      );

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 400));
    }
  }
);

const deleteUser = catchAsyncError(
  async (req: Request & { user: any }, res: Response, next: NextFunction) => {
    const result = await userService.deleteUser(req.params.id);
    res.status(200).json({
      success: true,
      message: "Delete user successful",
      data: result,
    });
  }
);

export const userController = {
  registrationUser,
  loginUser,
  logOutUser,
  updateUser,
  updatePassword,
  getAllUserByAdmin,
  getAllCourseByAdmin,
  updateUserRoleByAdmin,
  deleteUser,
};
