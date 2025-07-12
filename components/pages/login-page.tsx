"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { LoginForm } from "@/components/forms/login-form"

export function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stack-gray px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-stack-blue rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">S</span>
          </div>
          <h1 className="text-3xl font-inter font-bold text-gray-900">Welcome back</h1>
          <p className="text-gray-600 mt-2">Sign in to your StackIt account</p>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200">
          <LoginForm />

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link href="/signup" className="text-stack-blue hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
