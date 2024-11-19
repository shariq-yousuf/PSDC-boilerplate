import express from "express"
import usersRouter from "./web/users.js"
import apiRouter from "../routes/api/users.js"
import webRouter from "../routes/web/users.js"

const app = express()
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/", webRouter)
app.use("/api", apiRouter)

app.get("/", (req, res) => {
  res.render("index")
})

app.get("/register", (req, res) => {
  res.render("users/register")
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`)
})
