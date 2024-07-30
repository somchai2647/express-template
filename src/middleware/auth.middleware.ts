import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../share/utils";
import { Role } from "@prisma/client";

interface TokenPayload {
  id: string;
  role: Role;
}

const auth = (roles?: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ error: "Token is required" });
    }

    let payload: TokenPayload;
    try {
      payload = verifyToken(token) as TokenPayload;
    } catch (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    req.headers.userId = payload.id;

    if (roles && !roles.includes(payload.role)) {
      return res.status(403).json({ error: "Forbidden" });
    }

    next();
  };
};

export { auth };
