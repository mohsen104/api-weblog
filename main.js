import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import MongodbConfig from "./src/common/configs/mongodb.config.js";
import SwaggerConfig from "./src/common/configs/swagger.config.js";
import AllRoutes from "./src/app.routes.js";
import NotFoundHandler from "./src/common/exception/not-found.handler.js";
import AllExceptionHandler from "./src/common/exception/all-exception.handler.js";
import express from "express";
dotenv.config();

async function main() {
  const app = express();
  const cookieSecretKey = process.env.COOKIE_SECRET_KEY;
  const port = process.env.PORT;

  MongodbConfig();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cookieParser(cookieSecretKey));
  app.use("/public", express.static("public"));

  app.use(AllRoutes);

  SwaggerConfig(app);

  NotFoundHandler(app);
  AllExceptionHandler(app);

  app.listen(port, () => {
    console.log(`Server run http://localhost:${port}`);
  });
}

main();
