import { Router } from "express";
import { layoutController } from "./layout.controller";
import { auth } from "../../middleware/auth";

const router = Router();

router.post("/create-layout", auth("admin"), layoutController.createLayout);
router.put("/edit-layout", auth("admin"), layoutController.editLayout);
router.get(
  "/get-layout/:type",
  auth("admin"),
  layoutController.getLayoutByType
);

export const layoutRouter = router;
