import { Schema, model } from "mongoose";
import { TNotification } from "./notification.interface";

const NotificationSchema = new Schema<TNotification>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    title: { type: String, },
    status: { type: String, },
    message: { type: String, required: true, default: "unread" },
  },
  { timestamps: true }
);

export const NotificationModel=model("notification",NotificationSchema)
