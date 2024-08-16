import { Types } from "mongoose";

export interface TNotification {
  userId: Types.ObjectId;
  title: string;
  message: string;
  status: string;
}
