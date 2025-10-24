import { Request, Response } from "express";
import { IRequestUser } from "../../types";
import { config, statusCodes } from "../../config";
import { logger } from "../../utils/logger";
import User from "../../models/user.model";

type userData = Pick<IRequestUser, "email" | "userId">;
export const BanUserHandler = async (req: Request, res: Response) => {
    try {
        const { userId, email } = req.requestUser as userData;
        const userToBeBan = req.body;

        if (!config.WHITELISTED_EMAIL.includes(email)) {
            logger.warn(`${email} tried to access unauthorized endpoint`);
            return res.status(statusCodes.FORBIDDED).json({ message: "unauthorized" });
        }

        User.updateOne(
            { email },
            {
                $set: { banned: true }
            }
        )
            .select("email")
            .exec()
            .then((bannedUser) => {
                return res
                    .status(statusCodes.OK)
                    .json({ message: "user has been banned from this platform", bannedUser });
            })
            .catch((error) => {
                logger.error(error);
                res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
                    message: "internal server error"
                });
            });
    } catch (error) {}
};
