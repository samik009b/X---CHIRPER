import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../../models/user.model";
import { config, statusCodes } from "../../config";
import { logger } from "../../utils/logger";

const getAllUsers = async (req: Request, res: Response) => {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(statusCodes.NOT_FOUND).json({ message: "token not found" });

    const decoded = jwt.verify(token, config.REFRESH_TOKEN_SECRET!) as {
        userId: string;
        email: string;
    };
    if (!config.WHITELISTED_EMAIL.includes(decoded.email)) {
        logger.warn(`${decoded.email} tried accessing admin only end-point`);
        return res.status(statusCodes.FORBIDDED).json({ message: "access denied" });
    }
    const filter = req.query.filter;

    if (filter !== "name" && filter !== "age") {
        return res.status(statusCodes.BAD_REQUEST).json({ message: "invalid filter" });
    }
    User.find()
        .sort({ [filter]: 1 })
        .select("name email createdAt")
        .lean()
        .exec()
        .then((sortedUsers) => {
            logger.info("users brought successfully");
            return res
                .status(statusCodes.OK)
                .json({ message: "users brought successfully", sortedUsers });
        })
        .catch((error) => {
            return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ success: false, error });
        });
};

export default getAllUsers;
