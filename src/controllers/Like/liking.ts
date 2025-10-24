import { Request, Response } from "express";
import { statusCodes } from "../../config";
import { Like } from "../../models/like.model";
import { logger } from "../../utils/logger";

export const likeHandler = async (req: Request, res: Response) => {
    const postId = req.body;
    const authorId = req.requestUser;

    if (!postId) return res.status(statusCodes.NOT_FOUND).json({ message: "post not found" });

    Like.exists({ postId })
        .lean()
        .exec()
        .then((isLikedPost) => {
            if (!isLikedPost) {
                return res.status(statusCodes.BAD_REQUEST).json({ message: "post already liked" });
            }
            const LikedPost = Like.create({
                authorId,
                postId
            });
            return res.status(statusCodes.OK).json({ message: "post liked", LikedPost });
        })
        .catch((error) => {
            logger.error(error);
            return res
                .status(statusCodes.INTERNAL_SERVER_ERROR)
                .json({ message: "something went wrong" });
        });
};
