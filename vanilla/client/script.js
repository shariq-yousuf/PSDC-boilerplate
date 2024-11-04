const usernameInput = document.getElementById("username")
const passwordInput = document.getElementById("password")
const newUsernameInput = document.getElementById("newUsername")
const emailInput = document.getElementById("email")
const newPasswordInput = document.getElementById("newPassword")
const confirmPasswordInput = document.getElementById("confirmPassword")
const loginLink = document.getElementById("loginLink")
const signupLink = document.getElementById("signupLink")
const logoutLink = document.getElementById("logoutLink")
const resetNewPasswordInput = document.getElementById("new-password")
const resetConfirmPasswordInput = document.getElementById(
  "confirm-new-password"
)

function isLoggedIn() {
  return localStorage.getItem("loggedIn") === "true"
}

function login(event) {
  event.preventDefault()
  const username = usernameInput.value
  const password = passwordInput.value

  if (username === "user" && password === "password") {
    // alert("Login successful!")
    localStorage.setItem("loggedIn", "true")
    window.location.href = "dashboard.html"
  } else {
    alert("Invalid credentials")
  }
}

function signup(event) {
  event.preventDefault()
  const newUsername = newUsernameInput.value
  const email = emailInput.value
  const newPassword = newPasswordInput.value
  const confirmPassword = confirmPasswordInput.value

  if (newPassword !== confirmPassword) {
    alert("Passwords do not match!")
    return
  }

  alert(`User ${newUsername} signed up successfully with email ${email}!`)
  window.location.href = "login.html"
}

function logout() {
  localStorage.removeItem("loggedIn")
  alert("Logged out successfully!")
  window.location.href = "index.html"
}

function resetPassword(e) {
  e.preventDefault()
  alert("Password reset link sent to your email!")

  window.location.href = "create-new-password.html"
}

function createNewPassword(e) {
  e.preventDefault()
  const newPassword = resetNewPasswordInput.value
  const confirmPassword = resetConfirxmPasswordInput.value

  if (newPassword !== confirmPassword) {
    alert("Passwords do not match!")
    return
  } else {
    alert("Password created successfully!")
    window.location.href = "login.html"
  }
}

function adjustNavLinks() {
  if (isLoggedIn()) {
    loginLink.style.display = "none"
    signupLink.style.display = "none"
    logoutLink.style.display = "inline"
  } else {
    loginLink.style.display = "inline"
    signupLink.style.display = "inline"
    logoutLink.style.display = "none"
  }
}

document.addEventListener("DOMContentLoaded", adjustNavLinks)
