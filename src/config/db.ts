import mongoose from "mongoose";
import { config } from "./index";

const DBconnect = async () => {
    try {
        const db = await mongoose.connect(config.MONGO_URI, {
            family: 4,
            serverSelectionTimeoutMS: 5000
        });
        console.log(`the database is connected successfully by ${db.connection.host}`);
    } catch (error) {
        console.log("failed to connect to database -> ", error);
        process.exit(1);
    }
};

export default DBconnect;
