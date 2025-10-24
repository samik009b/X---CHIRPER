import { Request, Response } from "express";
import { IRequestUser } from "../../types";
import { statusCodes } from "../../config";
import { logger } from "../../utils/logger";
import { Post } from "../../models/post.model";

type userData = Pick<IRequestUser, "email" | "userId">;
export const postDeleteHandler = async (req: Request, res: Response) => {
    const { email, userId } = req.requestUser as userData;

    // what if someone put -ve or character ?
    const serialNumber = req.params.serialNumber;
    if (!serialNumber) {
        return res
            .status(statusCodes.BAD_REQUEST)
            .json({ message: "serial number of post not mentioned" });
    }

    const latestSerialNumber = await Post.findById({ userId }).select("serialNumber");

    Post.deleteOne({
        $and: [{ userId }, { serialNumber }]
    })
        .exec()
        .then((deletedPost) => {
            res.status(statusCodes.OK).json({ message: "post deleted successfully", deletedPost });
        })
        .catch((error) => {
            logger.error(error);
            return res.status(statusCodes.INTERNAL_SERVER_ERROR);
        });
};
