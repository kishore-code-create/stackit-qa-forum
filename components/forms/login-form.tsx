"use client"

import Link from "next/link"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Mail, Lock, Chrome } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const { login, loginWithGoogle } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!password.trim()) {
      newErrors.password = "Password is required"
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    try {
      await loginWithGoogle() // Simulate Google login
      toast({
        title: "Logged in with Google!",
        description: "You have been successfully logged in using your Google account.",
      })
      router.push("/")
    } catch (error) {
      toast({
        title: "Google login failed",
        description: "Could not log in with Google. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    setErrors({}) // Clear previous errors

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Login failed")
      }

      // Store JWT token in localStorage
      localStorage.setItem("token", data.token)
      
      // Store user data if needed (optional)
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user))
      }

      // Call the login function from useAuth hook to update context
      await login(email, password, rememberMe)

      toast({
        title: "Welcome back!",
        description: "You have been successfully logged in.",
      })

      router.push("/")
    } catch (error) {
      console.error("Login error:", error)
      const errorMessage = error instanceof Error ? error.message : "Invalid email or password. Please try again."
      
      setErrors({ general: errorMessage })
      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.general && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
        >
          {errors.general}
        </motion.div>
      )}

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email Address
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (errors.email) setErrors((prev) => ({ ...prev, email: "" }))
            }}
            className={`pl-10 ${errors.email ? "border-red-300 focus:border-red-500" : ""}`}
            placeholder="Enter your email"
          />
        </div>
        {errors.email && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-red-600">
            {errors.email}
          </motion.p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium text-gray-700">
          Password
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              if (errors.password) setErrors((prev) => ({ ...prev, password: "" }))
            }}
            className={`pl-10 pr-10 ${errors.password ? "border-red-300 focus:border-red-500" : ""}`}
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.password && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-red-600">
            {errors.password}
          </motion.p>
        )}
      </div>

      {/* Remember Me */}
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="remember" 
          checked={rememberMe} 
          onCheckedChange={(checked) => setRememberMe(checked === true)} 
        />
        <Label htmlFor="remember" className="text-sm text-gray-600">
          Remember me
        </Label>
      </div>

      {/* Submit Button */}
      <Button type="submit" disabled={isLoading} className="w-full bg-stack-blue hover:bg-blue-700 text-white">
        {isLoading ? "Signing in..." : "Sign In"}
      </Button>

      <div className="relative flex items-center justify-center text-xs uppercase text-gray-600">
        <span className="bg-white px-2 z-10">Or</span>
        <div className="absolute inset-x-0 h-px bg-gray-200" />
      </div>

      {/* Google Login Button */}
      <Button
        type="button"
        onClick={handleGoogleLogin}
        disabled={isLoading}
        variant="outline"
        className="w-full flex items-center justify-center space-x-2 border-gray-300 hover:bg-gray-50 bg-transparent"
      >
        <Chrome className="w-5 h-5" />
        <span>Sign In with Google</span>
      </Button>

      {/* Forgot Password */}
      <div className="text-center">
        <Link href="/forgot-password" className="text-sm text-stack-blue hover:underline">
          Forgot your password?
        </Link>
      </div>
    </form>
  )
}