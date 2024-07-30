import jwt from "jsonwebtoken";
import { config } from "../config";

const generateToken = (payload: any): string => {
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn: config.EXPIRES_IN });
};

const verifyToken = (token: string | undefined): any => {
  try {
    return jwt.verify(token ?? "", config.JWT_SECRET);
  } catch (error) {
    return false;
  }
};

const decodeToken = (token: string): any => {
  return jwt.decode(token);
};

export { generateToken, verifyToken, decodeToken };
