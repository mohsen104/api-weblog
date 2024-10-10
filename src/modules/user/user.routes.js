import { Router } from "express";
import UserController from "./user.controller.js";
import Authorization from "../../common/guards/Authorization.guard.js";
import uploadFile from "../../common/middlewares/multer.js";

const router = Router();

router.put(
  "/change-profile/:id",
  Authorization,
  uploadFile.single("profile"),
  UserController.changeProfile,
);
router.get("/:id", Authorization, UserController.getOne);

export default router;
