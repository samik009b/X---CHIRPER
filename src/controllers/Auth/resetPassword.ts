import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../../models/user.model";
import { config, statusCodes } from "../../config";
import { logger } from "../../utils/logger";

const resetPasswordHandler = async (req: Request, res: Response) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const token = req.cookies.refreshToken;

        if (!token)
            return res.status(statusCodes.UNAUTHORIZED).json({ message: "No token provided" });
        if (!oldPassword || !newPassword)
            return res
                .status(statusCodes.BAD_REQUEST)
                .json({ message: "Old and new passwords are required" });

        const decoded = jwt.verify(token, config.REFRESH_TOKEN_SECRET!) as {
            userId: string;
            email: string;
        };
        const user = await userModel.findById(decoded.userId);
        if (!user) return res.status(statusCodes.NOT_FOUND).json({ message: "User not found" });

        const isPasswordVerified = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordVerified)
            return res
                .status(statusCodes.UNAUTHORIZED)
                .json({ message: "Old password is incorrect" });

        if (oldPassword === newPassword)
            return res
                .status(statusCodes.BAD_REQUEST)
                .json({ message: "New password cannot be same as old" });

        user.password = newPassword;
        await user.save();

        logger.info(`Password reset successful for ${decoded.email}`);

        return res.status(statusCodes.OK).json({ message: "Password updated successfully" });
    } catch (error) {
        logger.error("Error resetting password", { error });
        return res
            .status(statusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Internal server error" });
    }
};

export default resetPasswordHandler;
