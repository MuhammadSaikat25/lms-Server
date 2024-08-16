import express from "express";
import { courseController } from "./course.controller";
import { auth } from "../../middleware/auth";

const route = express.Router();
route.post("/create-course", auth("admin"), courseController.createCourse);
route.post("/getVideoOPT", courseController.generateVideoUrl);
route.put("/update-course/:id", auth("admin"), courseController.updateCourse);
route.get("/course/:id", courseController.getSingleCourse);
route.get("/course", courseController.getAllCourse);
route.get("/user-course/:id", auth("user"), courseController.getCourseByUser);
route.delete(
  "/delete-course/:id",
  auth("admin"),
  courseController.deleteCourseByAdmin
);

export const courseRouter = route;
