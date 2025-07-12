"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  reputation: number
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  loginWithGoogle: () => Promise<void> // Add this line
  logout: () => void
  isLoading: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem("stackit_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, rememberMe = false) => {
    // Mock login - in real app, this would call your API
    const mockUser: User = {
      id: "1",
      name: "John Doe",
      email: email,
      avatar: "/placeholder.svg?height=40&width=40",
      reputation: 1250,
    }

    setUser(mockUser)
    if (rememberMe) {
      localStorage.setItem("stackit_user", JSON.stringify(mockUser))
    }
  }

  const signup = async (name: string, email: string, password: string) => {
    // Mock signup - in real app, this would call your API
    const mockUser: User = {
      id: Date.now().toString(),
      name: name,
      email: email,
      avatar: "/placeholder.svg?height=40&width=40",
      reputation: 0,
    }

    setUser(mockUser)
    localStorage.setItem("stackit_user", JSON.stringify(mockUser))
  }

  const loginWithGoogle = async () => {
    // Simulate Google login success
    const mockUser: User = {
      id: "google_user_1",
      name: "Google User",
      email: "google@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      reputation: 50, // Starting reputation for new Google users
    }
    setUser(mockUser)
    localStorage.setItem("stackit_user", JSON.stringify(mockUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("stackit_user")
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, loginWithGoogle, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
