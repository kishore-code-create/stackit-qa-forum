"use client"

import { motion } from "framer-motion"
import { AnswerCard } from "./answer-card"

interface AnswerListProps {
  answers: any[]
  questionOwnerId: string
  onAnswerUpdate: (answers: any[]) => void
}

export function AnswerList({ answers, questionOwnerId, onAnswerUpdate }: AnswerListProps) {
  const sortedAnswers = [...answers].sort((a, b) => {
    // Accepted answers first
    if (a.isAccepted && !b.isAccepted) return -1
    if (!a.isAccepted && b.isAccepted) return 1

    // Then by vote count
    const aVotes = a.upvotes - a.downvotes
    const bVotes = b.upvotes - b.downvotes
    return bVotes - aVotes
  })

  const handleAcceptAnswer = (answerId: string) => {
    const updatedAnswers = answers.map((answer) => ({
      ...answer,
      isAccepted: answer.id === answerId ? !answer.isAccepted : false,
    }))
    onAnswerUpdate(updatedAnswers)
  }

  const handleVoteUpdate = (answerId: string, newVotes: any) => {
    const updatedAnswers = answers.map((answer) => (answer.id === answerId ? { ...answer, ...newVotes } : answer))
    onAnswerUpdate(updatedAnswers)
  }

  return (
    <div className="space-y-6">
      {sortedAnswers.map((answer, index) => (
        <motion.div
          key={answer.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <AnswerCard
            answer={answer}
            questionOwnerId={questionOwnerId}
            onAccept={() => handleAcceptAnswer(answer.id)}
            onVoteUpdate={(votes) => handleVoteUpdate(answer.id, votes)}
          />
        </motion.div>
      ))}

      {answers.length === 0 && (
        <div className="text-center py-8 text-gray-500">No answers yet. Be the first to answer this question!</div>
      )}
    </div>
  )
}
