import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config";
import { Types } from "mongoose";

interface TokenPayload extends JwtPayload {
    userId: Types.ObjectId;
    email?: string;
}
const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined;

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
    }
    if (!token && req.cookies?.refreshToken) {
        token = req.cookies.refreshToken;
    }
    if (!token) {
        throw new Error("refresh token is not found or malformed");
    }

    const decoded = jwt.verify(token, config.REFRESH_TOKEN_SECRET as string) as TokenPayload;
    if (!decoded.userId) throw new Error("token is not valid");
    req.requestUser = {
        userId: decoded.userId,
        email: decoded.email!
    };

    next();
};

export default validateToken;
