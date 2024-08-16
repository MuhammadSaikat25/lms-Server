

import { NotificationModel } from "./notification.model";

const updateNotification = async (id: string) => {
  const update = await NotificationModel.findByIdAndUpdate(
    id,
    { status: "read" },
    { new: true }
  );
  const result = await NotificationModel.find().sort({
    createdAt: -1,
  });
  return result;
};

export const notificationService = {
  updateNotification,
};
