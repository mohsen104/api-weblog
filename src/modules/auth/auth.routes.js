import { Router } from "express";
import AuthController from "./auth.controller.js";
import Authorization from "../../common/guards/Authorization.guard.js";

const router = Router();

router.post("/send-otp", AuthController.sendOtp);
router.post("/check-otp", AuthController.checkOtp);
router.get("/logout", Authorization, AuthController.logout);

export default router;
