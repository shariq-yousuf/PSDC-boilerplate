// src/components/Header.tsx
import React from "react"
import { Link, useNavigate } from "react-router-dom"

interface HeaderProps {
  isLoggedIn: boolean
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    setIsLoggedIn(false)
    navigate("/")
  }

  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="flex space-x-4">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        {!isLoggedIn && (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/signup" className="hover:underline">
              Sign Up
            </Link>
          </>
        )}

        {isLoggedIn && (
          <>
            <Link to="/dashboard" className="hover:underline">
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="hover:underline text-red-500"
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header
