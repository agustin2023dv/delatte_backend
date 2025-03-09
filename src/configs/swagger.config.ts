import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Delatte API",
    version: "1.0.0",
    description: "Documentación de la API de Delatte",
  },
  servers: [
    {
      url: "http://localhost:8081/api",
      description: "Servidor local de desarrollo",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/modules/**/*.routes.ts"], 
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
