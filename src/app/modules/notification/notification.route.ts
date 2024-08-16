import { Router } from "express";
import { notificationController } from "./notification.controller";
import { auth } from "../../middleware/auth";

const router = Router();
router.get(
  "/get-notification",
  auth("user"),
  notificationController.getNotification
);
router.put(
  "/update-notification/:id",
  auth("user"),
  notificationController.updateNotification
);

export const notificationRouter = router;
