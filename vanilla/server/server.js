import express from "express"
import fs from "fs"

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set("view engine", "ejs")

let isLoggedIn = false
let currentUser = null
let resetId = null
let resetEmail = null

app.get("/", (req, res) => {
  if (isLoggedIn) {
    res.redirect("/dashboard")
  }

  res.render("index", { isLoggedIn })
})

app.get("/login", (req, res) => {
  if (isLoggedIn) {
    res.redirect("/dashboard")
  }

  res.render("login", { isLoggedIn })
})

app.post("/login", async (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync("data.json", "utf-8"))

    const username = req.body.username
    const password = req.body.password

    for (const person of data) {
      if (person.username === username && person.password === password) {
        isLoggedIn = true
        currentUser = person
        res.status(200).redirect("/dashboard")
        return
      }
    }

    res.status(401).send({
      message:
        "Invalid login credentials. Please ensure that your username and password are correct and try again.",
    })
  } catch (error) {
    console.error(error)
    res.status(500).send({
      message: "Internal server error. Please try again later.",
    })
  }
})

app.get("/signup", (req, res) => {
  if (isLoggedIn) {
    res.redirect("/dashboard")
  }

  res.render("signup", { isLoggedIn })
})

app.post("/signup", (req, res) => {
  fs.readFile("data.json", "utf-8", (err, data) => {
    if (err) {
      console.error("read file err: ", err)
      res.status(500).send({
        message: "Internal server error. Please try again later.",
      })
      return
    }

    const persons = JSON.parse(data)
    const username = req.body.username
    const email = req.body.email

    for (const person of persons) {
      if (person.username === username || person.email === email) {
        res.status(400).send({
          message:
            "Username or email already exists. Please choose a different username or email and try again.",
        })
        return
      }
    }

    persons.push(req.body)

    fs.writeFile("data.json", JSON.stringify(persons), () => {})

    res.status(200).redirect("/login")
  })
})

app.get("/logout", (req, res) => {
  isLoggedIn = false
  currentUser = null
  resetId = null
  resetEmail = null
  res.redirect("/login")
})

app.get("/dashboard", (req, res) => {
  if (!isLoggedIn) {
    res.redirect("/login")
  }

  res.render("dashboard", {
    isLoggedIn,
  })
})

app.get("/profile", (req, res) => {
  res.render("profile", {
    isLoggedIn,
    username: currentUser.username,
    email: currentUser.email,
  })
})

app.patch("/create-new-password", (req, res) => {
  const newPassword = req.body.newPassword
  const email = req.body.email

  fs.readFile("data.json", "utf-8", (err, data) => {
    if (err) {
      console.error("read file err: ", err)
      res.status(500).send({
        message: "Internal server error. Please try again later.",
      })
      return
    }

    const persons = JSON.parse(data)
    const updated = persons.map((person) => {
      if (person.email === email) {
        person.password = newPassword
      }
      return person
    })

    fs.writeFile("data.json", JSON.stringify(updated), () => {})

    res.status(200).end()
  })
})

app.get("/forgot-password", (req, res) => {
  if (isLoggedIn) {
    res.redirect("/dashboard")
  }

  res.render("forgot-password", {
    isLoggedIn,
  })
})

app.post("/forgot-password", (req, res) => {
  const email = req.body.email

  fs.readFile("data.json", "utf-8", (err, data) => {
    if (err) {
      console.error("read file err: ", err)
      res.status(500).send({
        message: "Internal server error. Please try again later.",
      })
      return
    }

    const persons = JSON.parse(data)
    for (const person of persons) {
      if (person.email === email) {
        // send email
        resetId =
          Math.floor(Math.random() * 1000000) + "dkKnLjdHlklkHKIndl38mf7"
        resetEmail = person.email

        res.status(200).redirect(`/reset-password/${resetId}`)
        return
      }
    }

    res.status(400).send({
      message: "Email not found. Please try again.",
    })
  })
})

app.get("/reset-password/:id", (req, res) => {
  if (req.params.id === resetId) {
    res.render("reset-password", {
      isLoggedIn,
      email: resetEmail,
    })
  } else {
    res.status(400).send("Invalid reset link. Please try again.")
  }
})

app.delete("/delete-account", (req, res) => {
  const email = req.body.email

  try {
    fs.readFile("data.json", "utf-8", (err, data) => {
      if (err) {
        console.error("read file err: ", err)
        res.status(500).send({
          message: "Internal server error. Please try again later.",
        })
        return
      }

      const persons = JSON.parse(data)
      const updated = persons.filter((person) => person.email !== email)

      fs.writeFile("data.json", JSON.stringify(updated), () => {})

      res.status(200).send({
        redirect: "/logout",
      })
    })
  } catch (error) {
    console.error(error)
    res.status(500).send({
      message: "Internal server error. Please try again later.",
    })
  }
})

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `==> Server running on port ${
      process.env.PORT || 3000
    }\n==> http://localhost:${process.env.PORT || 3000}`
  )
})
