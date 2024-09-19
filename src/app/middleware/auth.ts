import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import UserModel from "../modules/users/user.model";
import catchAsyncError from "../utils/catchAsyncErrors";
import { ErrorHandler } from "../utils/ErrorHandler";

require("dotenv").config();

export const auth = (...UserRole: string[]) => {
  return catchAsyncError(
    async (
      req: Request & { user?: any },
      res: Response,
      next: NextFunction
    ) => {
      const token = req.headers.authorization;

      if (!token) {
        return next(new ErrorHandler("You have no access to this route", 400));
      }
      const decoded = jwt.verify(
        token as string,
        process.env.ACCESS_TOKEN as string
      ) as JwtPayload;

      const userExist = await UserModel.findById(decoded._id);

      if (!userExist) {
        return next(new ErrorHandler("You have no access to this route", 400));
      }

      if (UserRole && !UserRole.includes(decoded.role)) {
        return res.status(401).json({
          success: false,
          statusCode: 401,
          message: "You have no access to this route",
        });
      }

      req.user = userExist;
      next();
    }
  );
};
