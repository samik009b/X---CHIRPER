import { Router } from "express";
import registerhandler from "../controllers/Auth/register";
import loginHandler from "../controllers/Auth/login";
import resetPasswordHandler from "../controllers/Auth/resetPassword";
import logoutHandler from "../controllers/Auth/logout";
import getAllUsers from "../controllers/Admin/getAllUser";
import validateToken from "../middlewares/tokenValidator";

const router = Router();

// user routes

/**
 * @openapi
 * /register:
 *   post:
 *     tags:
 *       - Register
 *     summary: Registers new users
 *     description: Handles new user registration.
 *     responses:
 *       200:
 *         description: App is registering new users
 */
router.post("/register", registerhandler);

/**
 * @openapi
 * /login:
 *   post:
 *     tags:
 *       - Login
 *     summary: Logins users
 *     description: Handles new user login.
 *     responses:
 *       200:
 *         description: App is logging in new users
 */
router.post("/login", loginHandler);

/**
 * @openapi
 * /register:
 *   post:
 *     tags:
 *       - Register
 *     summary: Registers new users
 *     description: Handles new user registration.
 *     responses:
 *       200:
 *         description: App is registering new users
 */
router.post("/reset", resetPasswordHandler);

/**
 * @openapi
 * /logout:
 *   post:
 *     tags:
 *       - Logout
 *     summary: logs out users
 *     description: Handles new user registration.
 *     responses:
 *       200:
 *         description: App has logged out the user
 */
router.post("/logout", logoutHandler);

/**
 * @openapi
 * /register:
 *   post:
 *     tags:
 *       - Register
 *     summary: Registers new users
 *     description: Handles new user registration.
 *     responses:
 *       200:
 *         description: App is registering new users
 */

router.get("/alluser", validateToken, getAllUsers); // name / age

export const userRouter = router;
