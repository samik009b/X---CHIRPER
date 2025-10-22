/**
 * empty field check
 * unauthorized admin check
 * proper role distribution check
 * @result passed
 */

import { Request, Response } from "express";
import { logger } from "../../utils/logger";
import User from "../../models/user.model";
import { config, statusCodes } from "../../config";
import  uploadImage  from "../../utils/uploadImage";

export const registerhandler = async (req: Request, res: Response) => {
    let { name, email, password, role, imageUrl } = req.body;

    if ([name, email, password].some((field) => field.trim() === "")) {
        return res
            .status(statusCodes.BAD_REQUEST)
            .json({ message: "all fields are required" });
    }

    const isExistedUser = await User.findOne({ email });
    if (isExistedUser) {
        return res
            .status(statusCodes.BAD_REQUEST)
            .json({ message: "user already exists with this email" });
    }

    if (!config.WHITELISTED_EMAIL.includes(email) && role === "admin") {
        logger.warn(`${email} tried to register as admin`);
        return res
            .status(statusCodes.UNAUTHORIZED)
            .json({ message: "unauthorized to create an admin profile" });
    }

    let uploadedAvatar: string | null = null;
    if (imageUrl) {
        uploadedAvatar = await uploadImage(imageUrl);
    }

    const newUser = await User.create({
        name,
        email,
        password,
        avatar: uploadedAvatar,
        role
    });

    logger.info("a new user has been created", {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
    });
    console.log(uploadedAvatar);

    return res
        .status(statusCodes.CREATED)
        .json({ message: "user created successfully", newUser });
};

export default registerhandler;
