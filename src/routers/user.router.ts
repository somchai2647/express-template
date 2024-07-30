import { Router, Request, Response, NextFunction } from "express";
import { UserController } from "../controllers";

const userRouter = Router();

const userController = new UserController();

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 email:
 *                   type: string
 *                 name:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 */

userRouter.post("/", (req: Request, res: Response) =>
  userController.createUser(req, res)
);

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: Return all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   email:
 *                     type: string
 *                   name:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 */
userRouter.get("/", (req: Request, res: Response) =>
  userController.getUsers(req, res)
);

userRouter.get("/:id", (req: Request, res: Response) =>
  userController.getUserById(req, res)
);

export default userRouter
