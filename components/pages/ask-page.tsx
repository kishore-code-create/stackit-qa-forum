"use client"
import { motion } from "framer-motion"
import { AskForm } from "@/components/forms/ask-form"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function AskPage() {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h1 className="text-3xl font-inter font-bold text-gray-900 mb-4">Please log in to ask a question</h1>
          <p className="text-gray-600 mb-8">You need to be logged in to ask questions on StackIt.</p>
          <div className="space-x-4">
            <Link href="/login">
              <Button className="bg-stack-blue hover:bg-blue-700 text-white">Log In</Button>
            </Link>
            <Link href="/signup">
              <Button variant="outline">Sign Up</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div>
          <h1 className="text-3xl font-inter font-bold text-gray-900">Ask a Question</h1>
          <p className="text-gray-600 mt-2">Get help from the community by asking a detailed question.</p>
        </div>

        <AskForm />
      </motion.div>
    </div>
  )
}
