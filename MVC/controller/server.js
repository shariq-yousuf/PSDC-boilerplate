import express from "express"
import fs from "fs"
import usersRouter from "./web/users.js"

const app = express()
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/users", usersRouter)

app.get("/", (req, res) => {
  res.render("index")
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`)
})
