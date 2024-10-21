import { Router } from "express";
import { auth } from "../../middleware/auth";
import { purchaseCourseController } from "./purchaseCourder.controller";

const route=Router()
route.get('/my-purchaseCourse',auth("user","admin"),purchaseCourseController)
export const purchaseCourse=route