import { Router } from "express";
import { auth } from "../middleware/auth.middleware";
import userRouter from "./user.router";
import authRouter from "./auth.router";
import adminRouter from "./admin.router";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "ok" });
});
router.use("/user", auth(["USER"]), userRouter);
router.use("/auth", authRouter);

router.use("/admin", adminRouter);

export default router;
