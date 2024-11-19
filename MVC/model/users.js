import util from "util"
import fs from "fs"

const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)

const dir = import.meta.dirname

class User {
  constructor(username, email, phoneNumber) {
    this.username = username
    this.email = email
    this.phoneNumber = phoneNumber
  }
}

const getAllUsersFromDB = async () => {
  try {
    const data = await readFileAsync(dir + "/data.json", "utf-8")
    const users = JSON.parse(data)
    return users
  } catch (err) {
    console.error("get all users", err)
    return []
  }
}

const getUserFromDB = async (userId) => {
  try {
    const data = await readFileAsync(dir + "/data.json", "utf-8")
    const users = JSON.parse(data)
    const user = users.find((user) => user.id === Number(userId))
    return user
  } catch (err) {
    console.error("get user", err)
    return null
  }
}

const addUserToDB = async (user) => {
  try {
    const data = await readFileAsync(dir + "/data.json", "utf-8")
    const users = JSON.parse(data)

    users.push({ id: users.length + 1, ...user })

    await writeFileAsync(dir + "/data.json", JSON.stringify(users))

    return true
  } catch (err) {
    console.error("add user", err)
    return false
  }
}

const deleteUserFromDB = async (userId) => {
  try {
    const data = await readFileAsync(dir + "/data.json", "utf-8")
    const users = JSON.parse(data)

    const updatedUsers = users.filter((user) => user.id !== Number(userId))

    await writeFileAsync(dir + "/data.json", JSON.stringify(updatedUsers))

    return true
  } catch (err) {
    console.error("delete user", err)
    return false
  }
}

const updateUserInDB = async (userId, reqBody) => {
  const { username, email, "phone-number": phoneNumber } = reqBody

  try {
    const data = await readFileAsync(dir + "/data.json", "utf-8")
    const users = JSON.parse(data)

    const updatedUsers = users.map((user) => {
      if (user.id === Number(userId)) {
        return { ...user, username, email, phoneNumber }
      }

      return user
    })

    await writeFileAsync(dir + "/data.json", JSON.stringify(updatedUsers))

    return true
  } catch (err) {
    console.error("update user", err)
    return false
  }
}

export {
  User,
  getAllUsersFromDB,
  getUserFromDB,
  addUserToDB,
  deleteUserFromDB,
  updateUserInDB,
}
