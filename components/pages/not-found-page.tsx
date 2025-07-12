"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Home, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stack-gray px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md mx-auto"
      >
        {/* 404 Illustration */}
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} className="mb-8">
          <div className="text-8xl font-bold text-stack-red mb-4">404</div>
          <div className="w-32 h-32 mx-auto bg-red-100 rounded-full flex items-center justify-center">
            <div className="text-4xl">🤔</div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="space-y-4">
          <h1 className="text-3xl font-inter font-bold text-gray-900">Page Not Found</h1>
          <p className="text-gray-600 leading-relaxed">
            Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong
            URL.
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 mt-8"
        >
          <Button onClick={() => window.history.back()} variant="outline" className="flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
          <Link href="/">
            <Button className="bg-stack-blue hover:bg-blue-700 text-white w-full sm:w-auto">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </motion.div>

        {/* Helpful Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 pt-8 border-t border-gray-200"
        >
          <p className="text-sm text-gray-500 mb-4">Looking for something specific?</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/" className="text-stack-blue hover:underline">
              Browse Questions
            </Link>
            <Link href="/ask" className="text-stack-blue hover:underline">
              Ask a Question
            </Link>
            <Link href="/tags" className="text-stack-blue hover:underline">
              Explore Tags
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
