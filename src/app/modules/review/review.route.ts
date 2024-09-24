import { Router } from "express";
import { reviewController } from "./review.controller";
import { auth } from "../../middleware/auth";

const route=Router()
route.post('/review/:id',auth('admin',"user"),reviewController.postReview)
route.get('/review',auth('admin',"user"),reviewController.getReview)

export const reviewRouter=route