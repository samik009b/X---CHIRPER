import { Router } from "express";
import registerhandler from "../controllers/Auth/register";
import loginHandler from "../controllers/Auth/login";
import resetPasswordHandler from "../controllers/Auth/resetPassword";
import logoutHandler from "../controllers/Auth/logout";
import getAllUsers from "../controllers/Admin/getAllUser";
import validateToken from "../middlewares/tokenValidator";

const router = Router();

// user routes
router.post("/register", registerhandler);
router.post("/login", loginHandler);
router.post("/reset", resetPasswordHandler);
router.post("/logout", logoutHandler);

// admin routes
router.get("/alluser", validateToken, getAllUsers); // name / age

export const userRouter = router;
