import { Router } from "express";
import { auth } from "../../middleware/auth";
import { purchaseCourseController } from "./purchaseCourder.controller";

const route=Router()
route.get('/my-purchaseCourse',auth("user"),purchaseCourseController)
export const purchaseCourse=route