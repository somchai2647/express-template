import { Router, Request, Response, NextFunction } from "express";

import { UserController } from "../controllers";

import { auth } from "../middleware/auth.middleware";

const adminRouter = Router();

const userController = new UserController();

adminRouter.use(auth(["ADMIN"]));
adminRouter.get("/user", (req: Request, res: Response) =>
  userController.getUsers(req, res)
);

export default adminRouter;
