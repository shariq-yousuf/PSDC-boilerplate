import express from "express"
import { User, addUserToDB, getAllUsersFromDB } from "../../model/users.js"

const router = express.Router()

router
  .route("/")
  .get(async (req, res) => {
    const users = await getAllUsersFromDB()
    res.json(users)
  })
  .post(async (req, res) => {
    const { username, email, phoneNumber } = req.body

    const user = new User(username, email, phoneNumber)
    const added = await addUserToDB(user)

    if (added) {
      res.status(201).redirect("/api/users")
    } else {
      res.status(500).redirect("/api/users/error")
    }
  })

router.get("/error", (req, res) => {
  res.json({ message: "Something went wrong!" })
})

export default router
