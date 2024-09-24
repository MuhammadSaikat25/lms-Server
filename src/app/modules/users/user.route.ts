import { Router } from "express";
import { userController } from "./user.controller";
import { auth } from "../../middleware/auth";

const router = Router();
router.post("/register-user", userController.registrationUser);
router.post("/login-user", userController.loginUser);
router.post("/logout-user", userController.logOutUser);
router.put(
  "/update-user/:email",
  auth("user", "admin"),
  userController.updateUser
);
router.put(
  "/update-password",
  auth("user", "admin"),
  userController.updatePassword
);
router.get("/get-allUsers", auth("admin","user"), userController.getAllUserByAdmin);
router.get("/get-allCourse", auth("admin"), userController.getAllCourseByAdmin);

router.put(
  "/update-role/:email",
  auth("admin"),
  userController.updateUserRoleByAdmin
);
router.delete("/delete-user/:id", auth("admin"), userController.deleteUser);
export const userRouter = router;
