"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AdvancedRichTextEditor } from "@/components/editor/advanced-rich-text-editor"
import { TagSelector } from "@/components/ui/tag-selector"
import { SaveDraftToast } from "@/components/ui/save-draft-toast"
import { useToast } from "@/hooks/use-toast"
import { Tag } from "@/components/ui/tag"
import { getToken } from "@/hooks/use-auth" // Use centralized token function
import { mockTags } from "@/utils/mock-data" // Import mockTags

export function AskForm() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showDraftSaved, setShowDraftSaved] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !content.trim() || tags.length === 0) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields and add at least one tag.",
        variant: "destructive",
      })
      return
    }

    // Check if user is authenticated
    const token = getToken()
    if (!token) {
      toast({
        title: "Authentication required",
        description: "Please login to post a question.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title.trim(),
          body: content.trim(),
          tags: tags,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to post question")
      }

      toast({
        title: "Question posted successfully!",
        description: "Your question has been posted and is now visible to the community.",
      })

      // Clear the draft after successful submission
      localStorage.removeItem("question_draft")
      
      // Redirect to the new question page if ID is provided
      if (data.id || data._id) {
        router.push(`/question/${data.id || data._id}`)
      } else {
        router.push("/")
      }
    } catch (error) {
      console.error("Error posting question:", error)
      toast({
        title: "Error posting question",
        description: error instanceof Error ? error.message : "There was an error posting your question. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const saveDraft = () => {
    localStorage.setItem(
      "question_draft",
      JSON.stringify({
        title,
        content,
        tags,
        timestamp: new Date().toISOString(),
      }),
    )
    setShowDraftSaved(true)
    setTimeout(() => setShowDraftSaved(false), 3000)
  }

  const handleAddTagFromSuggestion = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags((prev) => [...prev, tag])
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-xl p-6 shadow-md border border-gray-200"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-medium text-gray-700">
            Question Title *
          </Label>
          <Input
            id="title"
            type="text"
            placeholder="What's your programming question? Be specific."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-lg"
            required
          />
          <p className="text-sm text-gray-500">Be specific and imagine you're asking a question to another person.</p>
        </div>

        {/* Rich Text Editor */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Question Details *</Label>
          <AdvancedRichTextEditor
            content={content}
            onChange={setContent}
            placeholder="Provide all the details about your question. Include what you've tried and what you're expecting to happen."
          />
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Tags *</Label>
          {/* Popular Tags Suggestion */}
          <div className="mb-3">
            <p className="text-sm text-gray-600 mb-2">Popular Tags:</p>
            <div className="flex overflow-x-auto pb-2 space-x-2 scrollbar-hide">
              {mockTags
                .filter((tag) => !tags.includes(tag.name))
                .map((tag) => (
                  <Tag key={tag.name} name={tag.name} onClick={() => handleAddTagFromSuggestion(tag.name)} />
                ))}
            </div>
          </div>
          <TagSelector
            selectedTags={tags}
            onTagsChange={setTags}
            placeholder="Add up to 5 tags to describe what your question is about"
          />
          <p className="text-sm text-gray-500">Add up to 5 tags to describe what your question is about.</p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <Button type="button" variant="outline" onClick={saveDraft} disabled={!title.trim() && !content.trim()}>
            Save Draft
          </Button>

          <div className="space-x-3">
            <Button type="button" variant="ghost" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" className="bg-stack-blue hover:bg-blue-700 text-white" disabled={isSubmitting}>
              {isSubmitting ? "Posting..." : "Post Question"}
            </Button>
          </div>
        </div>
      </form>

      {/* Draft Saved Toast */}
      <SaveDraftToast show={showDraftSaved} />
    </motion.div>
  )
}