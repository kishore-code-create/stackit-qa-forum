"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function Toaster() {
  const { toasts, dismiss } = useToast()

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            className={`max-w-sm p-4 rounded-lg shadow-lg border ${
              toast.variant === "destructive"
                ? "bg-red-50 border-red-200 text-red-800"
                : "bg-white border-gray-200 text-gray-800"
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                {toast.variant === "destructive" ? (
                  <AlertCircle className="w-5 h-5 text-red-500" />
                ) : (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-medium">{toast.title}</h4>
                {toast.description && <p className="text-sm opacity-75 mt-1">{toast.description}</p>}
              </div>
              <button onClick={() => dismiss(toast.id)} className="flex-shrink-0 text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
