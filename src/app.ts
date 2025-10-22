import express from "express"
import cookieParser from "cookie-parser"
import { userRouter } from "./routes/user.routes"
import { postRouter } from "./routes/post.routes"

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Routes
app.use("/user", userRouter)
app.use("/post", postRouter)
export default app
