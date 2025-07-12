"use client"

import { useContext } from "react"
import { AuthContext } from "@/components/providers/auth-provider"

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// Helper function to get JWT token from localStorage
export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token")
  }
  return null
}

// Helper function to remove token (for logout)
export const removeToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token")
  }
}

// Helper function to check if user is authenticated
export const isAuthenticated = () => {
  return getToken() !== null
}