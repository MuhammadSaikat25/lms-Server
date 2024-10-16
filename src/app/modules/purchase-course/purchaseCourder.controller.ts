import { Request, Response, NextFunction, RequestHandler } from "express";
import { purchaseCourseModel } from "./purchaseCourder.model";

interface CustomRequest extends Request {
  user?: any;
}

export const purchaseCourseController: RequestHandler = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user.email;
    const result = await purchaseCourseModel
      .findOne({
        userId: user,
      })
      .populate("courses");

    const test = JSON.stringify(result, null, 2);
    res.json({
      data: result,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
