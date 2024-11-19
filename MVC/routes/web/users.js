import usersWebController from "../../controller/web/users.js"
import express from "express"

const router = express.Router()

router.use("/users", usersWebController)

export default router
