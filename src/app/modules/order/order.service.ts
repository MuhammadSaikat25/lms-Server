import { ErrorHandler } from "../../utils/ErrorHandler";
import { CourseModel } from "../course/course.model";
import UserModel from "../users/user.model";
import { orderModel } from "./order.model";
import path from "path";
import ejs from "ejs";
import sendMail from "../../utils/sendEmail";
import { NotificationModel } from "../notification/notification.model";

const createOrder = async <T>(playLoad: any) => {
  const { courseId, paymentInfo, user } = playLoad;
  // ! check user exist or not
  const isUserExits = await UserModel.findById(user);
  if (!isUserExits) {
    return;
  }
  // ! check that user purchased course or not
  const isCourseAlreadyPurchased = isUserExits?.courses.some(
    (course: any) => course.courseId === courseId
  );

  if (isCourseAlreadyPurchased) {
    return new ErrorHandler("Course is already purchased", 400);
  }
  // ! course exist or not
  const isCourseExit = await CourseModel.findById(courseId);
  if (!isCourseExit) {
    return new ErrorHandler("Course does't exits", 400);
  }
  const data: any = {
    userId: user?._id,
    courseId: isCourseExit!._id,
    paymentInfo
  };
  const result = await orderModel.create(data);
  const mailData = {
    order: {
      _id: isCourseExit._id.toString().slice(0, 6),
      name: isCourseExit.name,
      price: isCourseExit.price,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    },
  };
  const html = await ejs.renderFile(
    path.join(__dirname, "../../mails/order-email.ejs"),
    mailData
  );
  try {
    if (user) {
      await sendMail({
        email: isUserExits.email,
        subject: "Order Confirmation",
        template: "order-email.ejs",
        data: mailData,
      });
    }
  } catch (error) {}
  const updatedUserData = await UserModel.findByIdAndUpdate(
    isUserExits._id,
    { $addToSet: { courses: { courseId } } },
    { new: true }
  );
  await NotificationModel.create({
    userId: isUserExits._id,
    title: "New Order",
    message: `You have a new order from ${isCourseExit.name}`,
  });
  if (isCourseExit) {
  await CourseModel.findByIdAndUpdate(isCourseExit._id,{purchased:isCourseExit.purchased!+1})
  }
  return updatedUserData;
};

export const orderService = {
  createOrder,
};
