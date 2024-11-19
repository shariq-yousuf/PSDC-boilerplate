import usersRouter from "../../controller/api/users.js"
import express from "express"

const router = express.Router()

router.use("/users", usersRouter)

export default router
