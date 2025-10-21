import app from "./app";
import DBconnect from "./config/db";
import { config } from "./config";
import {logger} from "./utils/logger";

const startserver = async () => {
    try {
        await DBconnect();
        const PORT = config.PORT;
        app.listen(PORT, () => {
            logger.info("application started");
            logger.debug("application started");
            logger.warn("application started");
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {}
};

startserver();
