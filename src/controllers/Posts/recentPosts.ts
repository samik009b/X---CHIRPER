import { Request, Response } from "express"
import { Post } from "../../models/post.model"
import { statusCodes } from "../../config"
import { logger } from "../../utils/logger"

const recentPostsHandler = async (req: Request, res: Response) => {
    const userId = req.requestUser?.userId
    if (!userId)
        return res.status(statusCodes.UNAUTHORIZED).json({ message: "you need to login first" })

    try {
        Post.find()
            .sort({ createdAt: -1 })
            .lean()
            .exec()
            .then((allPosts) => {
                if (allPosts.length === 0) {
                    return res.status(statusCodes.NO_CONTENT).json({ message: "no posts" })
                }
                return res.status(statusCodes.OK).json({message: "posts fetched",allPosts})
            })
            .catch((error) => {
                logger.error("error fetching posts from database")
                throw new Error(error)
            })
    } catch (error) {
        logger.error("internal server error")
        return res
            .status(statusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "internal server error", error })
    }
}

export default recentPostsHandler
