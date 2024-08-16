import { model, Schema } from "mongoose";
import { TCourse, TCourseData } from "./course.interface";



const CourseDataSchema = new Schema<TCourseData>({
  module: String,
  linksUrl: [{ title: String, url: String }],
  videos: [{ title: String, url: String }],
});

const CourseSchema = new Schema<TCourse>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    estimatedPrice: { type: Number },
    thumbnail: String,
    tags: {
      type: String,
    },
    level: {
      type: String,
      require: true,
    },
    demoUrl: {
      type: String,
      require: true,
    },
    benefits: [{ title: String }],
    prerequisite: [{ title: String }],
    reviews: [],
    courseContent: [CourseDataSchema],
    ratings: {
      type: Number,
      default: 0,
    },
    purchased: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const CourseModel = model("Course", CourseSchema);
