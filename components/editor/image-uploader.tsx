"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Upload, X, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageUploaderProps {
  onImageInsert: (imageUrl: string) => void
}

export function ImageUploader({ onImageInsert }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    handleFiles(files)
  }

  const handleFiles = (files: File[]) => {
    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const imageUrl = e.target?.result as string
          setUploadedImages((prev) => [...prev, imageUrl])
        }
        reader.readAsDataURL(file)
      }
    })
  }

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <motion.div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragging ? "border-stack-blue bg-blue-50" : "border-gray-300 hover:border-gray-400"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        whileHover={{ scale: 1.02 }}
      >
        <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-gray-600 mb-2">Drag and drop images here, or click to select</p>
        <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
          <Upload className="w-4 h-4 mr-2" />
          Choose Images
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
      </motion.div>

      {/* Uploaded Images */}
      {uploadedImages.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {uploadedImages.map((imageUrl, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative group"
            >
              <img
                src={imageUrl || "/placeholder.svg"}
                alt={`Upload ${index + 1}`}
                className="w-full h-20 object-cover rounded border cursor-pointer hover:opacity-75"
                onClick={() => onImageInsert(imageUrl)}
              />
              <button
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => setUploadedImages((prev) => prev.filter((_, i) => i !== index))}
              >
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
