import { Request, Response } from "express";
import { statusCodes } from "../../config";
import { IRequestUser } from "../../types";
import { logger } from "../../utils/logger";
import { Post } from "../../models/post.model";

type userData = Pick<IRequestUser, "userId" | "email">;
const createPostHandler = async (req: Request, res: Response) => {
    const { userId, email } = req.requestUser as userData;
    const { content } = req.body;

    if (content.trim() === "") {
        return res.status(statusCodes.BAD_REQUEST).json({ message: "content is required" });
    }
    const latestPost = await Post.findOne({ userId }).select("serialNumber");
    const nextPostSerialNumber = latestPost ? latestPost.serialNumber + 1 : 1;

    const newPost = await Post.create({
        authorId: userId,
        serialNumber: nextPostSerialNumber,
        content: content
    });

    logger.info(`${email} created a post`);
    return res.status(statusCodes.CREATED).json(newPost);
};

export default createPostHandler;
