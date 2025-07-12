"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { QuestionCard } from "@/components/questions/question-card"
import { FilterBar } from "@/components/questions/filter-bar"
import { SortDropdown } from "@/components/questions/sort-dropdown"
import { TagFilterDropdown } from "@/components/questions/tag-filter-dropdown"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { mockQuestions, mockTags } from "@/utils/mock-data"
import { useAuth } from "@/hooks/use-auth"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function HomePage() {
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("recent") // recent | unanswered | most-voted | this-week
  const [sortOrder, setSortOrder] = useState("newest") // newest | oldest | most-answers
  const [selectedTagFilters, setSelectedTagFilters] = useState<string[]>([])
  const [showMyQuestions, setShowMyQuestions] = useState(false)

  const { user } = useAuth()

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setQuestions(mockQuestions)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredAndSortedQuestions = questions
    .filter((question) => {
      // Filter by main tabs
      if (filter === "unanswered" && question.answers > 0) return false
      if (filter === "this-week") {
        const oneWeekAgo = new Date()
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
        return new Date(question.createdAt) >= oneWeekAgo
      }
      return true
    })
    .filter((question) => {
      // Filter by selected tags
      if (selectedTagFilters.length === 0) return true
      return selectedTagFilters.every((tag) => question.tags.includes(tag))
    })
    .filter((question) => {
      // Filter by "My Questions"
      if (showMyQuestions && user) {
        return question.author.id === user.id
      }
      return true
    })
    .sort((a, b) => {
      // Apply sorting
      if (sortOrder === "newest") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
      if (sortOrder === "oldest") {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      }
      if (sortOrder === "most-answers") {
        return b.answers - a.answers
      }
      // Default for 'most-voted' filter (handled by filter bar, not sort dropdown)
      return 0
    })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-inter font-bold text-gray-900">All Questions</h1>
            <p className="text-gray-600 mt-1">{filteredAndSortedQuestions.length} questions</p>
          </div>
        </div>

        {/* Filter & Sort Controls */}
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <FilterBar activeFilter={filter} onFilterChange={setFilter} />
          <div className="flex items-center gap-4 ml-auto">
            <SortDropdown activeSort={sortOrder} onSortChange={setSortOrder} />
            <TagFilterDropdown
              allTags={mockTags.map((t) => t.name)}
              selectedTags={selectedTagFilters}
              onTagsChange={setSelectedTagFilters}
            />
            {user && (
              <div className="flex items-center space-x-2">
                <Switch id="my-questions" checked={showMyQuestions} onCheckedChange={setShowMyQuestions} />
                <Label htmlFor="my-questions" className="text-sm text-gray-700">
                  My Questions
                </Label>
              </div>
            )}
          </div>
        </div>

        {/* Questions Grid */}
        <div className="space-y-4">
          {filteredAndSortedQuestions.map((question, index) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <QuestionCard question={question} />
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAndSortedQuestions.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <div className="text-gray-400 text-lg">No questions found for this filter/sort combination.</div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
