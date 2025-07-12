"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface FilterBarProps {
  activeFilter: string
  onFilterChange: (filter: string) => void
}

export function FilterBar({ activeFilter, onFilterChange }: FilterBarProps) {
  const filters = [
    { id: "recent", label: "Recent" },
    { id: "most-voted", label: "Most Voted" },
    { id: "unanswered", label: "Unanswered" },
    { id: "this-week", label: "This Week" }, // Added "This Week"
  ]

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex-grow">
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <motion.div key={filter.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant={activeFilter === filter.id ? "default" : "outline"}
              onClick={() => onFilterChange(filter.id)}
              className={`${
                activeFilter === filter.id
                  ? "bg-stack-blue text-white border-stack-blue"
                  : "text-gray-600 border-gray-300 hover:border-stack-blue hover:text-stack-blue"
              } transition-all duration-200`}
            >
              {filter.label}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
