"use client"

import { motion } from "framer-motion"
import { Calendar, Eye, MessageCircle } from "lucide-react"
import { Tag } from "@/components/ui/tag"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatTimeAgo } from "@/utils/helpers"

interface QuestionHeaderProps {
  question: {
    id: string
    title: string
    tags: string[]
    author: {
      name: string
      avatar: string
      reputation: number
    }
    views: number
    answers: number
    createdAt: string
  }
}

export function QuestionHeader({ question }: QuestionHeaderProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      {/* Title */}
      <h1 className="text-3xl font-inter font-bold text-gray-900 leading-tight">{question.title}</h1>

      {/* Meta Information */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          <Calendar className="w-4 h-4" />
          <span>Asked {formatTimeAgo(question.createdAt)}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Eye className="w-4 h-4" />
          <span>{question.views} views</span>
        </div>
        <div className="flex items-center space-x-1">
          <MessageCircle className="w-4 h-4" />
          <span>{question.answers} answers</span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {question.tags.map((tag) => (
          <Tag key={tag} name={tag} />
        ))}
      </div>

      {/* Author */}
      <div className="flex items-center space-x-3 pt-2">
        <Avatar className="w-8 h-8">
          <AvatarImage src={question.author.avatar || "/placeholder.svg"} alt={question.author.name} />
          <AvatarFallback>{question.author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium text-stack-blue hover:underline cursor-pointer">{question.author.name}</div>
          <div className="text-sm text-gray-500">{question.author.reputation} reputation</div>
        </div>
      </div>
    </motion.div>
  )
}
