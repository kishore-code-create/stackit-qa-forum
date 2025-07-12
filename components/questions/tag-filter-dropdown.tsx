"use client"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface TagFilterDropdownProps {
  allTags: string[]
  selectedTags: string[]
  onTagsChange: (tags: string[]) => void
}

export function TagFilterDropdown({ allTags, selectedTags, onTagsChange }: TagFilterDropdownProps) {
  const handleTagToggle = (tag: string, checked: boolean) => {
    if (checked) {
      onTagsChange([...selectedTags, tag])
    } else {
      onTagsChange(selectedTags.filter((t) => t !== tag))
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            Tags ({selectedTags.length}) <ChevronDown className="w-4 h-4" />
          </Button>
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 p-2">
        <div className="max-h-60 overflow-y-auto space-y-1">
          {allTags.map((tag) => (
            <DropdownMenuItem
              key={tag}
              className="flex items-center justify-between space-x-2 p-2 cursor-pointer"
              onSelect={(e) => e.preventDefault()}
            >
              <Label htmlFor={`tag-${tag}`} className="flex items-center space-x-2 cursor-pointer flex-grow">
                <Checkbox
                  id={`tag-${tag}`}
                  checked={selectedTags.includes(tag)}
                  onCheckedChange={(checked) => handleTagToggle(tag, checked as boolean)}
                />
                <span>{tag}</span>
              </Label>
            </DropdownMenuItem>
          ))}
        </div>
        {allTags.length === 0 && <div className="text-center text-sm text-gray-500 py-2">No tags available</div>}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
