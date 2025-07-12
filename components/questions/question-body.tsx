"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowUp, ArrowDown, Bookmark, Share2 } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

interface QuestionBodyProps {
  question: {
    id: string
    content: string
    upvotes: number
    downvotes: number
    userVote?: "up" | "down" | null
  }
}

export function QuestionBody({ question }: QuestionBodyProps) {
  const [votes, setVotes] = useState({
    upvotes: question.upvotes,
    downvotes: question.downvotes,
    userVote: question.userVote || null,
  })
  const [isBookmarked, setIsBookmarked] = useState(false)
  const { user } = useAuth()
  const { toast } = useToast()

  const handleVote = (voteType: "up" | "down") => {
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to vote.",
        variant: "destructive",
      })
      return
    }

    setVotes((prev) => {
      const newVotes = { ...prev }

      // Remove previous vote
      if (prev.userVote === "up") {
        newVotes.upvotes--
      } else if (prev.userVote === "down") {
        newVotes.downvotes--
      }

      // Add new vote if different from previous
      if (prev.userVote !== voteType) {
        if (voteType === "up") {
          newVotes.upvotes++
        } else {
          newVotes.downvotes++
        }
        newVotes.userVote = voteType
      } else {
        newVotes.userVote = null
      }

      return newVotes
    })
  }

  const handleBookmark = () => {
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to bookmark questions.",
        variant: "destructive",
      })
      return
    }
    setIsBookmarked(!isBookmarked)
    toast({
      title: isBookmarked ? "Bookmark removed" : "Question bookmarked",
      description: isBookmarked ? "Question removed from your bookmarks." : "Question added to your bookmarks.",
    })
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: "Link copied",
      description: "Question link copied to clipboard.",
    })
  }

  const netVotes = votes.upvotes - votes.downvotes

  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
      <div className="flex gap-6">
        {/* Vote Controls */}
        <div className="flex flex-col items-center space-y-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleVote("up")}
            className={`p-2 rounded-full transition-colors ${
              votes.userVote === "up"
                ? "bg-stack-green text-white"
                : "text-gray-400 hover:text-stack-green hover:bg-green-50"
            }`}
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>

          <span className="text-xl font-bold text-gray-700">{netVotes}</span>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleVote("down")}
            className={`p-2 rounded-full transition-colors ${
              votes.userVote === "down"
                ? "bg-stack-red text-white"
                : "text-gray-400 hover:text-stack-red hover:bg-red-50"
            }`}
          >
            <ArrowDown className="w-6 h-6" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleBookmark}
            className={`p-2 rounded-full transition-colors ${
              isBookmarked ? "bg-stack-yellow text-white" : "text-gray-400 hover:text-stack-yellow hover:bg-yellow-50"
            }`}
          >
            <Bookmark className="w-5 h-5" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleShare}
            className="p-2 rounded-full text-gray-400 hover:text-stack-blue hover:bg-blue-50 transition-colors"
          >
            <Share2 className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Question Content */}
        <div className="flex-1">
          <div
            className="prose max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: question.content }}
          />
        </div>
      </div>
    </div>
  )
}
