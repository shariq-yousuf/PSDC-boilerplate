import e from "express"
import express from "express"
import fs from "fs"

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.set("view engine", "ejs")

const isLoggedIn = false

app.get("/", (req, res) => {
  res.render("index", { isLoggedIn })
})

app.get("/login", (req, res) => {
  res.render("login", { isLoggedIn })
})

app.post("/login", async (req, res) => {
  const data = JSON.parse(fs.readFileSync("data.json", "utf-8"))
  console.log(data)
})

app.get("/signup", (req, res) => {
  res.render("signup", { isLoggedIn })
})

app.post("/signup", async (req, res) => {
  fs.readFile("data.json", "utf-8", (err, data) => {
    // if (!data) {
    //   fs.writeFile("data.json", "[]", (err) => {
    //     console.error(err)
    //   })
    // }

    const persons = JSON.parse(data)
    persons.push(req.body)

    fs.writeFile("data.json", JSON.stringify(persons))

    res.send("Successfully Regestered!")
  })
})

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `==> Server running on port ${
      process.env.PORT || 3000
    }\n==> http://localhost:${process.env.PORT || 3000}`
  )
})
