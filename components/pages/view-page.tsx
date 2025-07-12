"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { QuestionHeader } from "@/components/questions/question-header"
import { QuestionBody } from "@/components/questions/question-body"
import { AnswerList } from "@/components/answers/answer-list"
import { AnswerForm } from "@/components/forms/answer-form"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useAuth } from "@/hooks/use-auth"
import { mockQuestions, mockAnswers } from "@/utils/mock-data"

interface ViewPageProps {
  questionId: string
}

export function ViewPage({ questionId }: ViewPageProps) {
  const [question, setQuestion] = useState(null)
  const [answers, setAnswers] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundQuestion = mockQuestions.find((q) => q.id === questionId)
      const questionAnswers = mockAnswers.filter((a) => a.questionId === questionId)

      setQuestion(foundQuestion)
      setAnswers(questionAnswers)
      setLoading(false)
    }, 1000)
  }, [questionId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (!question) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Question not found</h1>
          <p className="text-gray-600">The question you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        {/* Question Header */}
        <QuestionHeader question={question} />

        {/* Question Body */}
        <QuestionBody question={question} />

        {/* Answers */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {answers.length} {answers.length === 1 ? "Answer" : "Answers"}
            </h2>
          </div>

          <AnswerList
            answers={answers}
            questionOwnerId={question.author.id}
            onAnswerUpdate={(updatedAnswers) => setAnswers(updatedAnswers)}
          />
        </div>

        {/* Answer Form */}
        {user && (
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Answer</h3>
            <AnswerForm questionId={questionId} onAnswerSubmit={(newAnswer) => setAnswers([...answers, newAnswer])} />
          </div>
        )}

        {!user && (
          <div className="border-t border-gray-200 pt-6">
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <p className="text-gray-600 mb-4">Please log in to post an answer.</p>
              <div className="space-x-4">
                <a href="/login" className="text-stack-blue hover:underline">
                  Log In
                </a>
                <a href="/signup" className="text-stack-blue hover:underline">
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
