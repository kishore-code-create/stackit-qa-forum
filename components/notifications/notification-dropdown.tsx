"use client"

import { motion } from "framer-motion"
import { NotificationItem } from "./notification-item"
import { useNotifications } from "@/components/providers/notification-provider"
import { Button } from "@/components/ui/button"

interface NotificationDropdownProps {
  onClose: () => void
}

export function NotificationDropdown({ onClose }: NotificationDropdownProps) {
  const { notifications, markAllAsRead } = useNotifications()

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
    >
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Notifications</h3>
          {notifications.some((n) => !n.isRead) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-xs text-stack-blue hover:text-blue-700"
            >
              Mark all read
            </Button>
          )}
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} onClick={onClose} />
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">No notifications yet</div>
        )}
      </div>
    </motion.div>
  )
}
