import { ErrorHandler } from "../../utils/ErrorHandler";
import { TCourse } from "./course.interface";
import { CourseModel } from "./course.model";

const createCourse = async (palyLoad: TCourse) => {
  const result = await CourseModel.create(palyLoad);
  return result;
};
const updateCourse = async (PlayLoad: Partial<TCourse>, courseId: string) => {
  const result = await CourseModel.findByIdAndUpdate(
    courseId,
    {
      $set: PlayLoad,
    },
    { new: true }
  );
  return result;
};
const getSingleCourse = async (id: string) => {
  const result = await CourseModel.findById(id).select(
    "-courseData.videoUrl -courseData.suggestion -courseData.question -courseData.links "
  );
  return result;
};
const getCourseByUser = async (courseId: string, userCourse: any) => {
  const courseExist = userCourse.filter(
    (course: any) => course.courseId === courseId
  );
  if (!courseExist) {
    return new ErrorHandler("you are not eligible to access this course", 400);
  }
  const course = await CourseModel.findById(courseExist);
  return course?.courseContent;
};
const deleteCourseByAdmin = async (id: string) => {
  const courseExist = await CourseModel.findById(id);
  if (!courseExist) {
    throw new ErrorHandler("Course does not found", 400);
  }
  const result = CourseModel.findByIdAndDelete(id);
  return result;
};
export const courseService = {
  createCourse,
  updateCourse,
  getSingleCourse,
  getCourseByUser,
  deleteCourseByAdmin,
};
