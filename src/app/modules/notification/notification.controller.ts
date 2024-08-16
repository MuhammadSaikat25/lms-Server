import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../../utils/catchAsyncErrors";
import { NotificationModel } from "./notification.model";
// import ErrorHandler from "../../utils/ErrorHandler";
import { notificationService } from "./notification.service";
import { ErrorHandler } from "../../utils/ErrorHandler";

const getNotification = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notification = await NotificationModel.find().sort({
        createdAt: -1,
      });
      res.status(200).json({
        success: true,
        data: notification,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 400));
    }
  }
);
const updateNotification = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await notificationService.updateNotification(
        req.params.id
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
export const notificationController = {
  getNotification,
  updateNotification
};
