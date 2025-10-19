import { Router } from "express";
import { loginHandler } from "../controllers/Auth/login";
import registerhandler from "../controllers/Auth/register";

const router = Router();

router.post("/register", registerhandler);
router.post("/login", loginHandler);

export const userRouter = router;
