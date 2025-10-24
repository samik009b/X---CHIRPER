import app from "./app";
import DBconnect from "./config/db";
import { config } from "./config";
import { logger } from "./utils/logger";
import swaggerDocs from "./utils/swagger";

const startserver = async () => {
    try {
        await DBconnect();
        const PORT = config.PORT as number;
        swaggerDocs(app, PORT);
        app.listen(PORT, () => {
            logger.info(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {}
};

startserver();
