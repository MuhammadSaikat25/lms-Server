import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { userRouter } from "./app/modules/users/user.route";
import { layoutRouter } from "./app/modules/layout/layout.route";
import { courseRouter } from "./app/modules/course/course.route";
import { notificationRouter } from "./app/modules/notification/notification.route";
import { ErrorMiddleware } from "./app/middleware/error";
import { orderRouter } from "./app/modules/order/order.route";
import { analyticsRouter } from "./app/modules/analytics/analytics.router";
import { reviewRouter } from "./app/modules/review/review.route";
import { purchaseCourse } from "./app/modules/purchase-course/purchaseCourder.route";

export const app = express();
require("dotenv").config();

app.use(express.json({ limit: "25mb" }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Other-Custom-Header"],
  })
);

app.use(
  "/api/v1",
  userRouter,
  layoutRouter,
  courseRouter,
  notificationRouter,
  orderRouter,
  analyticsRouter,
  reviewRouter,
  purchaseCourse
);

app.get("/", (req, res) => {
  res.send("All ok for LMS");
});

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`route ${req.originalUrl} not found`) as any;
  err.statsCode = 404;
  next(err);
});

app.use(ErrorMiddleware);
