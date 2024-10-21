import { Request, Response, NextFunction } from "express";
import { orderService } from "./order.service";
import catchAsyncError from "../../utils/catchAsyncErrors";
import { ErrorHandler } from "../../utils/ErrorHandler";
import { orderModel } from "./order.model";
require("dotenv").config();
const stripe = require("stripe")(process.env.Secret_key);

const createOrder = catchAsyncError(
  async (req: Request & { user: any }, res: Response, next: NextFunction) => {
    const { courseId, paymentInfo } = req.body;
    // console.log(courseId,paymentInfo)
    try {
      const user = req.user._id;
      if (paymentInfo) {
        if ("id" in paymentInfo) {
          const paymentIntentId = paymentInfo.id;

          const paymentIntent = await stripe.paymentIntents.retrieve(
            paymentIntentId
          );
          if (paymentIntent.status !== "succeeded") {
            return next(new ErrorHandler("payment not authorized", 400));
          }
        }
      }

      const result = await orderService.createOrder({
        courseId,
        paymentInfo,
        user,
      });
      res.json({
        success: true,
        message: "Course purchased successful",
        data: result,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        data: error,
      });
    }
  }
);

// ! get all order for admin
const getAllOrderByAdmin = catchAsyncError(
  async (req: Request & { user: any }, res: Response, next: NextFunction) => {
    try {
      const result = await orderModel
        .find()
        .sort({ createdAt: -1 })
        .populate("courseId", "price")
        .populate("userId");
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 400));
    }
  }
);

export const stripePk = catchAsyncError(
  async (req: Request & { user: any }, res: Response, next: NextFunction) => {
    try {
      res.status(200).json({
        pk: process.env.PK,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 400));
    }
  }
);

const payment = catchAsyncError(
  async (req: Request & { user: any }, res: Response, next: NextFunction) => {
    try {
      const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "USD",
        metadata: {
          company: "Coding Hero",
        },
        automatic_payment_methods: {
          enabled: true,
        },
      });
      res.status(201).json({
        success: true,
        client_secret: myPayment.client_secret,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 400));
    }
  }
);

export const orderController = {
  createOrder,
  getAllOrderByAdmin,
  payment,
};
