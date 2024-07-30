import { Request, Response } from "express";
import { AuthService, UserService } from "../services";

export class AuthController {
  private authService: AuthService;
  private userService: UserService;

  constructor() {
    this.authService = new AuthService();
    this.userService = new UserService();
  }

  async registerUser(req: Request, res: Response) {
    try {
      const isEmailExist = await this.authService.isEmailExist(req.body.email);

      if (isEmailExist) {
        throw new Error("Email already exist");
      }

      const user = await this.authService.registerUser(req.body);

      const payload = {
        ...user,
        password: undefined,
      };

      res.status(201).json(payload);
    } catch (error) {
      // @ts-ignore
      res.status(400).json({ error: error.message });
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const token = await this.authService.loginUser(req.body);

      res.status(200).json({ token });
    } catch (error) {
      // @ts-ignore
      res.status(400).json({ error: error.message });
    }
  }

  async me(req: Request, res: Response) {
    console.log(req.headers.userId);
    const user = await this.userService.getUserById(req.headers.userId as string);

    console.log(user);

    return res.status(200).json(user);
  }
}
