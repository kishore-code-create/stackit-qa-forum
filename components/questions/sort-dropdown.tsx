"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface SortDropdownProps {
  activeSort: string
  onSortChange: (sort: string) => void
}

export function SortDropdown({ activeSort, onSortChange }: SortDropdownProps) {
  const sortOptions = [
    { id: "newest", label: "Newest" },
    { id: "oldest", label: "Oldest" },
    { id: "most-answers", label: "Most Answers" },
  ]

  const currentLabel = sortOptions.find((option) => option.id === activeSort)?.label || "Sort"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            Sort: {currentLabel} <ChevronDown className="w-4 h-4" />
          </Button>
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {sortOptions.map((option) => (
          <DropdownMenuItem
            key={option.id}
            onClick={() => onSortChange(option.id)}
            className={activeSort === option.id ? "bg-gray-100 font-medium" : ""}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
