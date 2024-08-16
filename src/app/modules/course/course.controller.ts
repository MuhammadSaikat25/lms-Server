import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../../utils/catchAsyncErrors";
import { courseService } from "./course.service";

import { CourseModel } from "./course.model";
import { ErrorHandler } from "../../utils/ErrorHandler";
import axios from "axios";

const createCourse = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      const result = await courseService.createCourse(data);
      res.json({
        success: true,
        message: "Course create successful",
        data: result,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 400));
    }
  }
);
const updateCourse = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseId = req.params.id;

      const result = await courseService.updateCourse(req.body, courseId);
      res.status(200).json({
        success: true,
        message: "Course update successful",
        data: result,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 400));
    }
  }
);
const getSingleCourse = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const courseId = req.params.id;
    try {
      const result = await courseService.getSingleCourse(courseId);
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 400));
    }
  }
);
const getAllCourse = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await CourseModel.find();
      // select(
      //   "-courseData.videoUrl -courseData.suggestion -courseData.question -courseData.links "
      // );
      res.status(200).send({
        success: true,
        data: result,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 400));
    }
  }
);
const getCourseByUser = catchAsyncError(
  async (req: Request & { user: any }, res: Response, next: NextFunction) => {
    const userCourseList = req?.user.courses;

    try {
      const result = await courseService.getCourseByUser(
        req.params.id,
        userCourseList
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
const deleteCourseByAdmin = catchAsyncError(
  async (req: Request & { user: any }, res: Response, next: NextFunction) => {
    try {
      const result = await courseService.deleteCourseByAdmin(req.params.id);
      res.status(200).json({
        success: true,
        message: "Course delete successful",
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 400));
    }
  }
);

const generateVideoUrl = catchAsyncError(
  async (req: Request & { user: any }, res: Response, next: NextFunction) => {
    try {
      const { videoId } = req.body;

      const response = await axios.post(
        `https://dev.vdocipher.com/api/videos/${videoId}/otp`,
        { ttl: 300 },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Apisecret ${process.env.VIDEO_CIPER}`,
          },
        }
      );
      res.json(response.data);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
export const courseController = {
  createCourse,
  updateCourse,
  getSingleCourse,
  getAllCourse,
  getCourseByUser,
  deleteCourseByAdmin,
  generateVideoUrl,
};
