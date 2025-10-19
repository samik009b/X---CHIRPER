import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { config } from "../config";

export const generateAccessToken = (userId: Types.ObjectId): string => {
    return jwt.sign({ userId }, config.ACCESS_TOKEN_SECRET as string, {
        expiresIn: config.ACCESS_TOKEN_EXPIRY
    });
};

export const generateRefreshToken = (userId: Types.ObjectId): string => {
    return jwt.sign({ userId }, config.REFRESH_TOKEN_SECRET as string, {
        expiresIn: config.REFRESH_TOKEN_EXPIRY
    });
};
