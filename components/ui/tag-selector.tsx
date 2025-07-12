"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tag } from "@/components/ui/tag"

interface TagSelectorProps {
  selectedTags: string[]
  onTagsChange: (tags: string[]) => void
  placeholder?: string
  maxTags?: number
}

export function TagSelector({
  selectedTags,
  onTagsChange,
  placeholder = "Add tags...",
  maxTags = 5,
}: TagSelectorProps) {
  const [inputValue, setInputValue] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Mock tag suggestions - in real app, this would come from API
  const allTags = [
    "javascript",
    "react",
    "typescript",
    "nodejs",
    "python",
    "css",
    "html",
    "vue",
    "angular",
    "svelte",
    "nextjs",
    "express",
    "mongodb",
    "postgresql",
    "mysql",
    "redis",
    "docker",
    "kubernetes",
    "aws",
    "azure",
    "git",
    "github",
    "api",
    "rest",
    "graphql",
    "testing",
    "jest",
    "cypress",
    "webpack",
    "vite",
  ]

  useEffect(() => {
    if (inputValue.length > 0) {
      const filtered = allTags
        .filter((tag) => tag.toLowerCase().includes(inputValue.toLowerCase()) && !selectedTags.includes(tag))
        .slice(0, 8)
      setSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }, [inputValue, selectedTags])

  const addTag = (tag: string) => {
    if (tag && !selectedTags.includes(tag) && selectedTags.length < maxTags) {
      onTagsChange([...selectedTags, tag])
      setInputValue("")
      setShowSuggestions(false)
    }
  }

  const removeTag = (tagToRemove: string) => {
    onTagsChange(selectedTags.filter((tag) => tag !== tagToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault()
      addTag(inputValue.trim().toLowerCase())
    } else if (e.key === "Backspace" && !inputValue && selectedTags.length > 0) {
      removeTag(selectedTags[selectedTags.length - 1])
    }
  }

  return (
    <div className="relative">
      {/* Selected Tags */}
      <div className="flex flex-wrap gap-2 mb-2">
        <AnimatePresence>
          {selectedTags.map((tag) => (
            <motion.div
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center"
            >
              <Tag name={tag} variant="selected" />
              <button onClick={() => removeTag(tag)} className="ml-1 text-white hover:text-gray-200">
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={selectedTags.length >= maxTags ? `Maximum ${maxTags} tags` : placeholder}
          disabled={selectedTags.length >= maxTags}
          className="pr-10"
        />
        {inputValue && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => addTag(inputValue.trim().toLowerCase())}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
          >
            <Plus className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Suggestions */}
      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto"
          >
            {suggestions.map((tag) => (
              <button
                key={tag}
                onClick={() => addTag(tag)}
                className="w-full px-3 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
              >
                <Tag name={tag} />
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tag Count */}
      <div className="text-xs text-gray-500 mt-1">
        {selectedTags.length}/{maxTags} tags
      </div>
    </div>
  )
}
