import express from "express"

const app = express()
app.set("views", "./views")
app.set("view engine", "ejs")

// const isLoggedIn = false

app.get("/", (req, res) => {
  res.render("index", { isLoggedIn: false })
})

app.get("/login", (req, res) => {
  res.render("login", { isLoggedIn: false })
})

app.get("/signup", (req, res) => {
  res.render("signup", { isLoggedIn: false })
})

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `==> Server running on port ${
      process.env.PORT || 3000
    }\n==> http://localhost:${process.env.PORT || 3000}`
  )
})
