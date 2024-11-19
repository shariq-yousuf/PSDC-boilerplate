import express from "express"
import {
  User,
  addUserToDB,
  deleteUserFromDB,
  getAllUsersFromDB,
  getUserFromDB,
  updateUserInDB,
} from "../../model/users.js"

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

router
  .route("/:userId")
  .get(async (req, res) => {
    const user = await getUserFromDB(req.params.userId)
    res.json({ user: user })
  })
  .delete(async (req, res) => {
    const deleted = await deleteUserFromDB(req.params.userId)

    if (deleted) {
      res.redirect("/api/users")
      // res.end()
    } else {
      res.status(500).redirect("/api/users/error")
    }
  })
  .patch(async (req, res) => {
    const updated = await updateUserInDB(req.params.userId, req.body)

    if (updated) {
      res.redirect(`/api/users/${req.params.userId}`)
    } else {
      res.status(500).redirect("/api/users/error")
    }
  })

router.get("/error", (req, res) => {
  res.json({ message: "Something went wrong!" })
})

export default router
