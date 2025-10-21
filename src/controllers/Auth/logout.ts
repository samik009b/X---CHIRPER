import { Request, Response } from "express";
import Token from "../../models/token.model";
import { logger } from "../../utils/logger";
import { config, statusCodes } from "../../config";

const logoutHandler = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken as string;

    if (refreshToken) {
        await Token.deleteOne({ token: refreshToken });
        logger.info("user refresh token deleted successfully", {
            refreshToken
        });
    }

    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: config.NODE_ENV === "production",
        sameSite: "strict"
    });

    logger.info("user has been logged out", {});

    res.status(statusCodes.NO_CONTENT).json({
        message: "user has been logged out"
    });
};

export default logoutHandler;
