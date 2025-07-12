"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowUp, ArrowDown, Check, Calendar } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AcceptedBadge } from "./accepted-badge"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { formatTimeAgo } from "@/utils/helpers"

interface AnswerCardProps {
  answer: {
    id: string
    content: string
    author: {
      id: string
      name: string
      avatar: string
      reputation: number
    }
    upvotes: number
    downvotes: number
    isAccepted: boolean
    createdAt: string
    userVote?: "up" | "down" | null
  }
  questionOwnerId: string
  onAccept: () => void
  onVoteUpdate: (votes: any) => void
}

export function AnswerCard({ answer, questionOwnerId, onAccept, onVoteUpdate }: AnswerCardProps) {
  const [votes, setVotes] = useState({
    upvotes: answer.upvotes,
    downvotes: answer.downvotes,
    userVote: answer.userVote || null,
  })
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

    const newVotes = { ...votes }

    // Remove previous vote
    if (votes.userVote === "up") {
      newVotes.upvotes--
    } else if (votes.userVote === "down") {
      newVotes.downvotes--
    }

    // Add new vote if different from previous
    if (votes.userVote !== voteType) {
      if (voteType === "up") {
        newVotes.upvotes++
      } else {
        newVotes.downvotes++
      }
      newVotes.userVote = voteType
    } else {
      newVotes.userVote = null
    }

    setVotes(newVotes)
    onVoteUpdate(newVotes)
  }

  const handleAccept = () => {
    if (!user || user.id !== questionOwnerId) {
      toast({
        title: "Permission denied",
        description: "Only the question owner can accept answers.",
        variant: "destructive",
      })
      return
    }
    onAccept()
  }

  const netVotes = votes.upvotes - votes.downvotes
  const canAccept = user && user.id === questionOwnerId

  return (
    <motion.div
      className={`bg-white rounded-xl p-6 shadow-md border-2 transition-all ${
        answer.isAccepted ? "border-stack-green bg-green-50" : "border-gray-200"
      }`}
    >
      {answer.isAccepted && <AcceptedBadge />}

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
            <ArrowUp className="w-5 h-5" />
          </motion.button>

          <span className="text-lg font-bold text-gray-700">{netVotes}</span>

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
            <ArrowDown className="w-5 h-5" />
          </motion.button>

          {canAccept && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleAccept}
              className={`p-2 rounded-full transition-colors ${
                answer.isAccepted
                  ? "bg-stack-green text-white"
                  : "text-gray-400 hover:text-stack-green hover:bg-green-50"
              }`}
              title={answer.isAccepted ? "Remove acceptance" : "Accept this answer"}
            >
              <Check className="w-5 h-5" />
            </motion.button>
          )}
        </div>

        {/* Answer Content */}
        <div className="flex-1">
          <div
            className="prose max-w-none text-gray-700 leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: answer.content }}
          />

          {/* Author Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src={answer.author.avatar || "/placeholder.svg"} alt={answer.author.name} />
                <AvatarFallback>{answer.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-stack-blue hover:underline cursor-pointer">{answer.author.name}</div>
                <div className="text-sm text-gray-500">{answer.author.reputation} reputation</div>
              </div>
            </div>

            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>answered {formatTimeAgo(answer.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
