"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Check } from "lucide-react"

interface SaveDraftToastProps {
  show: boolean
}

export function SaveDraftToast({ show }: SaveDraftToastProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          className="fixed bottom-4 left-4 z-50"
        >
          <div className="bg-stack-green text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
            <Check className="w-4 h-4" />
            <span className="text-sm font-medium">Draft saved</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
