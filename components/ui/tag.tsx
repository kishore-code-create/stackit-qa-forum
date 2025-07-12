"use client"

import { motion } from "framer-motion"

interface TagProps {
  name: string
  count?: number
  onClick?: () => void
  variant?: "default" | "selected"
}

export function Tag({ name, count, onClick, variant = "default" }: TagProps) {
  const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-all duration-200"
  const variantClasses = {
    default: "bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200",
    selected: "bg-stack-blue text-white border border-stack-blue",
  }

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variantClasses[variant]} ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
    >
      {name}
      {count && <span className="ml-1 text-xs opacity-75">({count})</span>}
    </motion.span>
  )
}
