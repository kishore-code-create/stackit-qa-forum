"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NotificationDropdown } from "./notification-dropdown"
import { useNotifications } from "@/components/providers/notification-provider"

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false)
  const { unreadCount } = useNotifications()

  return (
    <div className="relative">
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="relative">
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-stack-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </motion.div>
        )}
      </Button>

      <AnimatePresence>{isOpen && <NotificationDropdown onClose={() => setIsOpen(false)} />}</AnimatePresence>
    </div>
  )
}
