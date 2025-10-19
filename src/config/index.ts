import { config as conf } from "dotenv";
import ms from "ms";
conf();

export const config = Object.freeze({
    MONGO_URI: process.env.MONGO_URI || "",
    PORT: process.env.PORT || 5000,
    NODE_ENV: process.env.NODE_ENV || "development",
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY as ms.StringValue,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY as ms.StringValue,
    WHITELISTED_EMAIL: ["admin001@gmail.com", "admin007@gmail.com"]
});

export const statusCodes = Object.freeze({
    OK: 200,
    CREATED: 202,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDED: 403,
    NOT_FOUND: 404,
    TOO_MANY_REQUEST: 429,
    INTERNAL_SERVER_ERROR: 500
});
