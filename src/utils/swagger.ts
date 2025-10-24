import { Express, Request, Response } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { version } from "../../package.json";
import { logger } from "./logger";

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "REST API Docs",
            version
        },
        components: {
            securitySchemas: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "jwt"
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: ["./src/models/*.ts", "./src/routes/*.ts"]
};

const swaggerSpec = swaggerJSDoc(options);

function swaggerDocs(app: Express, port: number) {
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.get("docs.json", (req: Request, res: Response) => {
        res.setHeader("Content-type", "applicaiton-json");
        res.send(swaggerSpec);
    });
    logger.info(`docs are available in http://localhost:${port}/docs`);
}

export default swaggerDocs;