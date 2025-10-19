import app from "./app";
import DBconnect from "./config/db";
import { config } from "./config";

const startserver = async () => {
    try {
        await DBconnect();
        const PORT = config.PORT;
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {}
};

startserver();
