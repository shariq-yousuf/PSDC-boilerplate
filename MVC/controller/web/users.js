import express from "express"
import {
  addUserToDB,
  deleteUserFromDB,
  getAllUsersFromDB,
  getUserFromDB,
  updateUserInDB,
  User,
} from "../../model/users.js"

const router = express.Router()
express().use(express.json())

router
  .route("/")
  .get(async (req, res) => {
    const users = await getAllUsersFromDB()
    res.render("users/index", { users })
  })
  .post(async (req, res) => {
    const { username, email, "phone-number": phoneNumber } = req.body

    const user = new User(username, email, phoneNumber)
    const added = await addUserToDB(user)

    if (added) {
      res.status(201).redirect("/users")
    } else {
      res.status(500).redirect("/users/error")
    }
  })

router
  .route("/:userId")
  .get(async (req, res) => {
    const user = await getUserFromDB(req.params.userId)
    res.render("users/profile", { user })
  })
  .delete(async (req, res) => {
    const deleted = await deleteUserFromDB(req.params.userId)

    if (deleted) {
      res.redirect("/users")
      // res.end()
    } else {
      res.status(500).redirect("/users/error")
    }
  })
  .patch(async (req, res) => {
    const updated = await updateUserInDB(req.params.userId, req.body)

    if (updated) {
      res.redirect(`/users`)
    } else {
      res.status(500).redirect("/users/error")
    }
  })

router.get("/error", (req, res) => {
  res.render("users/error", { errorMessage: "Something went wrong" })
})

export default router
