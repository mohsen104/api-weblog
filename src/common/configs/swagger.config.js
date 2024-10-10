import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const SwaggerConfig = (app) => {
  const SwaggerDocument = swaggerJsdoc({
    swaggerDefinition: {
      openapi: "3.0.1",
      info: {
        title: "api-weblog",
        description: "",
        version: "1.0.0",
      },
    },
    apis: [process.cwd() + "/src/modules/**/*.swagger.js"],
  });

  const swagger = swaggerUi.setup(SwaggerDocument);

  app.use("/", swaggerUi.serve, swagger);
};

export default SwaggerConfig;
