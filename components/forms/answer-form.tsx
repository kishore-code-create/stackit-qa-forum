"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AdvancedRichTextEditor } from "@/components/editor/advanced-rich-text-editor"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"

interface AnswerFormProps {
  questionId: string
  onAnswerSubmit: (answer: any) => void
}

// Helper function to get token
const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token")
  }
  return null
}

export function AnswerForm({ questionId, onAnswerSubmit }: AnswerFormProps) {
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user } = useAuth()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!content.trim()) {
      toast({
        title: "Answer required",
        description: "Please provide an answer before submitting.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const token = getToken()
      
      if (!token) {
        toast({
          title: "Authentication required",
          description: "Please log in to post an answer.",
          variant: "destructive",
        })
        return
      }

      // Make API call to post answer
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions/${questionId}/answers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          content,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || "Failed to post answer")
      }

      // Use the response data from API, or fallback to local data structure
      const newAnswer = data.answer || {
        id: data.id || Date.now().toString(),
        content,
        author: {
          id: user?.id || "",
          name: user?.name || "Anonymous",
          avatar: user?.avatar || "",
          reputation: user?.reputation || 0,
        },
        upvotes: data.upvotes || 0,
        downvotes: data.downvotes || 0,
        isAccepted: data.isAccepted || false,
        createdAt: data.createdAt || new Date().toISOString(),
        questionId,
      }

      onAnswerSubmit(newAnswer)
      setContent("")

      toast({
        title: "Answer posted successfully!",
        description: "Your answer has been posted and is now visible to the community.",
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "There was an error posting your answer. Please try again."
      toast({
        title: "Error posting answer",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-md border border-gray-200"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <AdvancedRichTextEditor
          content={content}
          onChange={setContent}
          placeholder="Write your answer here. Be specific and provide examples when possible."
        />

        <div className="flex justify-end space-x-3">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setContent("")}
            disabled={!content.trim() || isSubmitting}
          >
            Clear
          </Button>
          <Button
            type="submit"
            className="bg-stack-blue hover:bg-blue-700 text-white"
            disabled={!content.trim() || isSubmitting}
          >
            {isSubmitting ? "Posting..." : "Post Answer"}
          </Button>
        </div>
      </form>
    </motion.div>
  )
}