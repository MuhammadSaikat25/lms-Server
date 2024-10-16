import { model, Schema, Types } from "mongoose";

const purchaseCourseSchema = new Schema(
  {
    userId: String,
    courses: [
      {
        type: Types.ObjectId,
        ref: "Course",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

export const purchaseCourseModel = model(
  "PurchaseCourse",
  purchaseCourseSchema
);
