"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

interface Notification {
  id: string
  type: "answer" | "comment" | "mention" | "vote"
  title: string
  message: string
  isRead: boolean
  createdAt: string
  questionId?: string
  answerId?: string
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  addNotification: (notification: Omit<Notification, "id" | "createdAt">) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "answer",
      title: "New Answer",
      message: "Someone answered your question about React hooks",
      isRead: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      questionId: "1",
    },
    {
      id: "2",
      type: "vote",
      title: "Upvote Received",
      message: "Your answer received an upvote",
      isRead: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      answerId: "1",
    },
    {
      id: "3",
      type: "mention",
      title: "You were mentioned",
      message: "@john mentioned you in a comment",
      isRead: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    },
  ])

  const unreadCount = notifications.filter((n) => !n.isRead).length

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
  }

  const addNotification = (notification: Omit<Notification, "id" | "createdAt">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    setNotifications((prev) => [newNotification, ...prev])
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        addNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}
