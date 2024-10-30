// src/pages/Login.tsx
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

interface LoginProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

const Login: React.FC<LoginProps> = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === "user" && password === "password") {
      alert("Login successful!")
      setIsLoggedIn(true)
      navigate("/dashboard")
    } else {
      alert("Invalid credentials")
    }
  }

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-lg font-medium">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-medium">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-gray-800 text-white rounded"
        >
          Login
        </button>
      </form>
    </main>
  )
}

export default Login
