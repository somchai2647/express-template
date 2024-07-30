import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import swagger from "swagger-ui-express";
import swaggerJsdoc, { Options } from "swagger-jsdoc";

import router from "./src/routers"; // Adjust path according to your project structure

import { config } from "./src/share/config";

const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with TypeScript",
      version: "1.0.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./src/routers/*.ts"], // Adjust path according to your project structure
};

const app = express();
const specs = swaggerJsdoc(options);

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  "/api-docs",
  swagger.serve,
  swagger.setup(specs, {
    explorer: true,
  })
);
app.use("/api", router);

app.listen(config.PORT || 3000, () =>
  console.log(`Server is started at http://localhost:${config.PORT}`)
);
