import { Router } from "express";
import { analyticsController } from "./analytics.controller";
import { auth } from "../../middleware/auth";

const route = Router();
route.get(
  "/get-user-analytic",
  auth("admin"),
  analyticsController.getUserAnalytics
);
route.get(
  "/get-order-analytic",
  auth("admin"),
  analyticsController.getOrderAnalytics
);
route.get(
  "/get-course-analytic",
  auth("admin"),
  analyticsController.getCourseAnalytics
);

export const analyticsRouter = route;
