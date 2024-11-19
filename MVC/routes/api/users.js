import usersApiController from "../../controller/api/users.js"
import express from "express"

const router = express.Router()

router.use("/users", usersApiController)

export default router
