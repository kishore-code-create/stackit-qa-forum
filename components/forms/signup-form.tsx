"use client"

import Link from "next/link"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

export function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const { signup } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain uppercase, lowercase, and number"
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const getPasswordStrength = () => {
    const password = formData.password
    let strength = 0

    if (password.length >= 8) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/\d/.test(password)) strength++
    if (/[^a-zA-Z\d]/.test(password)) strength++

    return strength
  }

  const getPasswordStrengthLabel = () => {
    const strength = getPasswordStrength()
    if (strength < 2) return { label: "Weak", color: "text-red-500" }
    if (strength < 4) return { label: "Medium", color: "text-yellow-500" }
    return { label: "Strong", color: "text-green-500" }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      // Make API call to signup endpoint
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || "Signup failed")
      }

      // Store token if returned from API
      if (data.token) {
        localStorage.setItem("token", data.token)
      }

      // Update auth context
      await signup(formData.name, formData.email, formData.password)

      toast({
        title: "Account created successfully!",
        description: "Welcome to StackIt! You can now start asking and answering questions.",
      })

      router.push("/")
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred during signup. Please try again."
      setErrors({ general: errorMessage })
      toast({
        title: "Signup failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const passwordStrength = getPasswordStrengthLabel()

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

      {/* Full Name */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium text-gray-700">
          Full Name
        </Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className={`pl-10 ${errors.name ? "border-red-300 focus:border-red-500" : ""}`}
            placeholder="Enter your full name"
          />
        </div>
        {errors.name && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-red-600">
            {errors.name}
          </motion.p>
        )}
      </div>

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
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
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
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            className={`pl-10 pr-10 ${errors.password ? "border-red-300 focus:border-red-500" : ""}`}
            placeholder="Create a password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {/* Password Strength */}
        {formData.password && (
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    getPasswordStrength() < 2
                      ? "bg-red-500"
                      : getPasswordStrength() < 4
                        ? "bg-yellow-500"
                        : "bg-green-500"
                  }`}
                  style={{ width: `${(getPasswordStrength() / 5) * 100}%` }}
                />
              </div>
              <span className={`text-xs ${passwordStrength.color}`}>{passwordStrength.label}</span>
            </div>
          </div>
        )}

        {errors.password && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-red-600">
            {errors.password}
          </motion.p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
          Confirm Password
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
            className={`pl-10 pr-10 ${errors.confirmPassword ? "border-red-300 focus:border-red-500" : ""}`}
            placeholder="Confirm your password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.confirmPassword && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-red-600">
            {errors.confirmPassword}
          </motion.p>
        )}
      </div>

      {/* Submit Button */}
      <Button type="submit" disabled={isLoading} className="w-full bg-stack-blue hover:bg-blue-700 text-white">
        {isLoading ? "Creating Account..." : "Create Account"}
      </Button>

      {/* Terms */}
      <p className="text-xs text-gray-500 text-center">
        By creating an account, you agree to our{" "}
        <Link href="/terms" className="text-stack-blue hover:underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="text-stack-blue hover:underline">
          Privacy Policy
        </Link>
      </p>
    </form>
  )
}