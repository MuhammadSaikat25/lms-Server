import { ObjectId } from "mongoose";

export interface TOrder {
  courseId: ObjectId | string;
  userId: ObjectId | string;
  paymentInfo?: object;
}
