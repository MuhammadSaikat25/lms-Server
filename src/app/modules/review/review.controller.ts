import { NextFunction, Request, Response } from "express";
import { reviewModel } from "./review.model";

interface CustomRequest extends Request {
  user?: any;
}

const postReview = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const course = req.params.id;
    const { rating } = req.body;
    const user = req.user?._id.toString();
    const result = await reviewModel.create({ course, rating, user });
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getReview = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user?._id.toString();
    const result = await reviewModel.find({ user });
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const reviewController = {
  postReview,
  getReview,
};
