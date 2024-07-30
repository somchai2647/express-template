import { Router, Request, Response, NextFunction } from "express";

import { AuthController } from "../controllers";

import { auth } from "../middleware/auth.middleware";

const authRouter = Router();

const authController = new AuthController();

authRouter.get("/me", auth(), (req: Request, res: Response) => {
  authController.me(req, res);
});

authRouter.post("/register", (req: Request, res: Response) =>
  authController.registerUser(req, res)
);

authRouter.post("/login", (req: Request, res: Response) =>
  authController.loginUser(req, res)
);

export default authRouter;
