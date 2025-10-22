import { Router } from "express";
import validateToken from "../middlewares/tokenValidator";
import recentPostsHandler from "../controllers/Posts/recentPosts";
import feedhandler from "../controllers/Posts/feed";
import createPostHandler from "../controllers/Posts/createPost";
import { postDeleteHandler } from "../controllers/Posts/deletePost";

const router = Router();

router.use(validateToken);

router.get("/recent", recentPostsHandler);
router.get("/feed", feedhandler);
router.post("/create", createPostHandler);
router.delete("/delete/:serialNumber", postDeleteHandler);

export const postRouter = router;
