import { Router } from "express";
import AuthRoutes from "./modules/auth/auth.routes.js";
import UserRoutes from "./modules/user/user.routes.js";
import PostRoutes from "./modules/post/post.routes.js";

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/user", UserRoutes);
router.use("/post", PostRoutes);

export default router;
