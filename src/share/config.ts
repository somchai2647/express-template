import dotenv from "dotenv";
dotenv.config();

const config = {
  JWT_SECRET: process.env.JWT_SECRET as string,
  PORT: process.env.PORT,
  EXPIRES_IN: process.env.EXPIRES_IN || "1d",
};

export { config };
