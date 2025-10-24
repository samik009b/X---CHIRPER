/**
 * empty field check
 * wrong credentials check
 * @todo - store the refresh token
 * @result
 */

import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { Types } from "mongoose";
import { IUser } from "../../types";
import User from "../../models/user.model";
import { logger } from "../../utils/logger";
import Token from "../../models/token.model";
import { config, statusCodes } from "../../config";
import { generateAccessToken, generateRefreshToken } from "../../utils/tokengeneration";

type inputType = Pick<IUser, "email" | "password">;

const loginHandler = async (req: Request, res: Response) => {
    const { email, password } = req.body as inputType;

    if (typeof email !== "string" || typeof password !== "string") {
        return res
            .status(statusCodes.BAD_REQUEST)
            .json({ message: "email and password are required" });
    }

    if ([email, password].some((field) => field.trim() === "")) {
        return res.status(statusCodes.BAD_REQUEST).json({ message: "all fields are required" });
    }

    const user = await User.findOne({ email }).select(" -__v");
    if (!user) {
        return res
            .status(statusCodes.NOT_FOUND)
            .json({ message: "this email has not been rregistered to this website" });
    }
    const isPasswordVerified = await bcrypt.compare(password, user.password);
    if (!isPasswordVerified) {
        return res.status(statusCodes.BAD_REQUEST).json({ message: "password is invalid" });
    }

    const accessToken = generateAccessToken(user._id as Types.ObjectId, user.email);
    const refreshToken = generateRefreshToken(user._id as Types.ObjectId, user.email);

    const newToken = await Token.create({
        userId: user._id,
        token: refreshToken
    });

    console.log(newToken);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: true,
        secure: config.NODE_ENV === "production"
    })
        .status(statusCodes.CREATED)
        .json({
            message: "user has been logged in",
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt
            },
            accessToken: accessToken,
            refreshToken: refreshToken
        });

    logger.info(`user logged in ${user.name}`);
    return;
};

export default loginHandler;
