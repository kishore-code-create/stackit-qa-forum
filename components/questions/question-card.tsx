"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowUp, ArrowDown, MessageCircle, Eye } from "lucide-react"
import { Tag } from "@/components/ui/tag"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatTimeAgo } from "@/utils/helpers"

interface QuestionCardProps {
  question: {
    id: string
    title: string
    content: string
    tags: string[]
    author: {
      name: string
      avatar: string
      reputation: number
    }
    upvotes: number
    downvotes: number
    answers: number
    views: number
    createdAt: string
    hasAcceptedAnswer: boolean
  }
}

export function QuestionCard({ question }: QuestionCardProps) {
  const netVotes = question.upvotes - question.downvotes

  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
      className="bg-white rounded-xl p-6 shadow-md border border-gray-200 transition-all duration-200"
    >
      <div className="flex gap-6">
        {/* Vote Display */}
        <div className="flex flex-col items-center space-y-2 min-w-[60px]">
          <div className="flex flex-col items-center">
            <ArrowUp className="w-5 h-5 text-gray-400" />
            <span className="text-lg font-semibold text-gray-700">{netVotes}</span>
            <ArrowDown className="w-5 h-5 text-gray-400" />
          </div>
          <div className="text-xs text-gray-500 text-center">votes</div>
        </div>

        {/* Answer Count */}
        <div className="flex flex-col items-center space-y-2 min-w-[60px]">
          <div
            className={`flex flex-col items-center p-2 rounded-lg ${
              question.hasAcceptedAnswer
                ? "bg-stack-green text-white"
                : question.answers > 0
                  ? "bg-gray-100 text-gray-700"
                  : "bg-gray-50 text-gray-500"
            }`}
          >
            <span className="text-lg font-semibold">{question.answers}</span>
          </div>
          <div className="text-xs text-gray-500 text-center">answers</div>
        </div>

        {/* Question Content */}
        <div className="flex-1 min-w-0">
          <Link href={`/question/${question.id}`}>
            <h3 className="text-lg font-semibold text-gray-900 hover:text-stack-blue cursor-pointer transition-colors line-clamp-2">
              {question.title}
            </h3>
          </Link>

          <p className="text-gray-600 mt-2 line-clamp-2">{question.content}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-3">
            {question.tags.map((tag) => (
              <Tag key={tag} name={tag} />
            ))}
          </div>

          {/* Meta Information */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{question.views}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle className="w-4 h-4" />
                <span>{question.answers}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">asked {formatTimeAgo(question.createdAt)} by</span>
              <div className="flex items-center space-x-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={question.author.avatar || "/placeholder.svg"} alt={question.author.name} />
                  <AvatarFallback>{question.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-stack-blue hover:underline cursor-pointer">
                  {question.author.name}
                </span>
                <span className="text-xs text-gray-500">({question.author.reputation})</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
