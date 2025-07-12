"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { SignupForm } from "@/components/forms/signup-form"

export function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stack-gray px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-stack-blue rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">S</span>
          </div>
          <h1 className="text-3xl font-inter font-bold text-gray-900">Join StackIt</h1>
          <p className="text-gray-600 mt-2">Create your account to start asking and answering questions</p>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200">
          <SignupForm />

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-stack-blue hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
