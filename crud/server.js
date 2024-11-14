import express from "express"
import fs from "fs"

const app = express()
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/", (req, res) => {
  res.render("index")
})

app.get("/users", (req, res) => {
  res.render("register")
})

app.post("/users", (req, res) => {
  const { username, email, phone } = req.body

  fs.readFile("data.json", "utf-8", (err, data) => {
    const users = JSON.parse(data)
    const user = {
      username,
      email,
      phone,
      id: users.length + 1,
    }

    users.push(user)

    fs.writeFile("data.json", JSON.stringify(users), () => {})

    res.redirect("/dashboard")
  })
})

app.get("/dashboard", (req, res) => {
  fs.readFile("data.json", "utf-8", (err, data) => {
    const users = JSON.parse(data)

    res.render("dashboard", { users })
  })
})

app.get("/users/:id", (req, res) => {
  fs.readFile("data.json", "utf-8", (err, data) => {
    const users = JSON.parse(data)
    const user = users.find((user) => user.id === Number(req.params.id))

    res.render("profile", { user })
  })
})

app.patch("/users/:id", (req, res) => {
  const { username, email, phone } = req.body

  fs.readFile("data.json", "utf-8", (err, data) => {
    const users = JSON.parse(data)
    const user = users.find((user) => user.id === Number(req.params.id))

    const updatedUsers = users.map((user) => {
      if (user.id === Number(req.params.id)) {
        return { ...user, username, email, phone }
      }

      return user
    })

    fs.writeFile("data.json", JSON.stringify(updatedUsers), () => {
      res.redirect("/dashboard")
    })
  })
})

app.delete("/users/:id", (req, res) => {
  fs.readFile("data.json", "utf-8", (err, data) => {
    const users = JSON.parse(data)
    const updatedUsers = users.filter(
      (user) => user.id !== Number(req.params.id)
    )

    fs.writeFile("data.json", JSON.stringify(updatedUsers), () => {
      res.redirect("/dashboard")
    })
  })
})

app.listen(3000, () => console.log("Server is running on port 3000"))
