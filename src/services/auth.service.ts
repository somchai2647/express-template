import { UserService, type User } from "./user.service";
import { generateToken, verifyToken, decodeToken } from "../share/utils";
import bcrypt from "bcrypt";

export class AuthService {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async registerUser(data: User) {
    const { password } = data;

    data.password = this.hashPassword(password);

    return this.userService.createUser(data);
  }

  async loginUser(data: User) {
    const { email, password } = data;

    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = this.comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    const { role, id, name } = user;

    return generateToken({ name, role, id });
  }

  async decodeToken(token: string) {
    return decodeToken(token);
  }

  async verifyToken(token: string | undefined) {
    return verifyToken(token);
  }

  async isEmailExist(email: string) {
    const user = await this.userService.getUserByEmail(email);

    return !!user;
  }

  hashPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(password, salt);
  }

  comparePassword(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
  }
}
