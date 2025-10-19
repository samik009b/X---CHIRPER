/**
 * empty field check
 * unauthorized admin check
 * proper role distribution check
 * @result passed
 */

import { Request, Response } from "express";
import User from "../../models/user.model";
import { config, statusCodes } from "../../config";

export const registerhandler = async (req: Request, res: Response) => {
    let { name, email, password, role } = req.body;

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
        return res
            .status(statusCodes.UNAUTHORIZED)
            .json({ message: "unauthorize to create an admin profile" });
    }
    const newUser = await User.create({
        name,
        email,
        password,
        role
    });
    return res
        .status(statusCodes.CREATED)
        .json({ message: "user created successfully", newUser });
};

export default registerhandler;
