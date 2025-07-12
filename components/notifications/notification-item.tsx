"use client"

import { motion } from "framer-motion"
import { MessageCircle, ArrowUp, AtSign, CheckCircle } from "lucide-react"
import { useNotifications } from "@/components/providers/notification-provider"
import { formatTimeAgo } from "@/utils/helpers"

interface NotificationItemProps {
  notification: {
    id: string
    type: "answer" | "comment" | "mention" | "vote"
    title: string
    message: string
    isRead: boolean
    createdAt: string
    questionId?: string
    answerId?: string
  }
  onClick: () => void
}

export function NotificationItem({ notification, onClick }: NotificationItemProps) {
  const { markAsRead } = useNotifications()

  const getIcon = () => {
    switch (notification.type) {
      case "answer":
        return <MessageCircle className="w-4 h-4 text-blue-500" />
      case "vote":
        return <ArrowUp className="w-4 h-4 text-green-500" />
      case "mention":
        return <AtSign className="w-4 h-4 text-orange-500" />
      default:
        return <CheckCircle className="w-4 h-4 text-gray-500" />
    }
  }

  const handleClick = () => {
    if (!notification.isRead) {
      markAsRead(notification.id)
    }
    onClick()
  }

  return (
    <motion.div
      whileHover={{ backgroundColor: "#f9fafb" }}
      onClick={handleClick}
      className={`p-4 border-b border-gray-100 cursor-pointer ${!notification.isRead ? "bg-blue-50" : ""}`}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-1">{getIcon()}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
            {!notification.isRead && <div className="w-2 h-2 bg-stack-blue rounded-full" />}
          </div>
          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
          <p className="text-xs text-gray-500 mt-2">{formatTimeAgo(notification.createdAt)}</p>
        </div>
      </div>
    </motion.div>
  )
}
