"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

export function AcceptedBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center space-x-2 mb-4 text-stack-green"
    >
      <div className="bg-stack-green text-white rounded-full p-1">
        <Check className="w-4 h-4" />
      </div>
      <span className="font-medium">Accepted Answer</span>
    </motion.div>
  )
}
