"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { TextStyleToolbar } from "./text-style-toolbar"
import { TextStylePanel } from "./text-style-panel"
import { EmojiPicker } from "./emoji-picker"
import { ImageUploader } from "./image-uploader"

interface AdvancedRichTextEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
}

export function AdvancedRichTextEditor({ content, onChange, placeholder }: AdvancedRichTextEditorProps) {
  const [showStylePanel, setShowStylePanel] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [selectedText, setSelectedText] = useState("")
  const [editorStyles, setEditorStyles] = useState({
    fontSize: 16,
    fontFamily: "Work Sans",
    color: "#000000",
    backgroundColor: "transparent",
    textAlign: "left",
    fontWeight: "normal",
    fontStyle: "normal",
    textDecoration: "none",
  })

  const editorRef = useRef<HTMLDivElement>(null)

  const handleTextSelection = () => {
    const selection = window.getSelection()
    if (selection && selection.toString()) {
      setSelectedText(selection.toString())
    }
  }

  const applyStyle = (style: string, value?: string) => {
    document.execCommand(style, false, value)
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const insertEmoji = (emoji: string) => {
    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      range.deleteContents()
      range.insertNode(document.createTextNode(emoji))
      range.collapse(false)
      selection.removeAllRanges()
      selection.addRange(range)
    }
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
    setShowEmojiPicker(false)
  }

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      {/* Toolbar */}
      <TextStyleToolbar
        onStyleApply={applyStyle}
        onToggleStylePanel={() => setShowStylePanel(!showStylePanel)}
        onToggleEmojiPicker={() => setShowEmojiPicker(!showEmojiPicker)}
        showStylePanel={showStylePanel}
        showEmojiPicker={showEmojiPicker}
      />

      <div className="flex">
        {/* Style Panel */}
        {showStylePanel && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="border-r border-gray-200 bg-gray-50"
          >
            <TextStylePanel
              styles={editorStyles}
              onStyleChange={setEditorStyles}
              onApplyToSelection={(styles) => {
                // Apply styles to selected text
                Object.entries(styles).forEach(([key, value]) => {
                  if (key === "fontSize") {
                    applyStyle("fontSize", `${value}px`)
                  } else if (key === "fontFamily") {
                    applyStyle("fontName", value as string)
                  } else if (key === "color") {
                    applyStyle("foreColor", value as string)
                  } else if (key === "backgroundColor") {
                    applyStyle("backColor", value as string)
                  } else if (key === "fontWeight") {
                    applyStyle("bold")
                  } else if (key === "fontStyle") {
                    applyStyle("italic")
                  } else if (key === "textDecoration") {
                    applyStyle("underline")
                  }
                })
              }}
            />
          </motion.div>
        )}

        {/* Editor Area */}
        <div className="flex-1 relative">
          <div
            ref={editorRef}
            contentEditable
            className="min-h-[300px] p-6 outline-none focus:ring-2 focus:ring-stack-blue focus:ring-inset"
            style={{
              fontSize: `${editorStyles.fontSize}px`,
              fontFamily: editorStyles.fontFamily,
              color: editorStyles.color,
              backgroundColor: editorStyles.backgroundColor,
              textAlign: editorStyles.textAlign as any,
              fontWeight: editorStyles.fontWeight,
              fontStyle: editorStyles.fontStyle,
              textDecoration: editorStyles.textDecoration,
            }}
            onInput={(e) => onChange(e.currentTarget.innerHTML)}
            onMouseUp={handleTextSelection}
            onKeyUp={handleTextSelection}
            suppressContentEditableWarning={true}
            data-placeholder={placeholder}
          />

          {/* Emoji Picker */}
          {showEmojiPicker && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-4 right-4 z-10"
            >
              <EmojiPicker onEmojiSelect={insertEmoji} />
            </motion.div>
          )}

          {/* Image Uploader */}
          <ImageUploader
            onImageInsert={(imageUrl) => {
              const img = document.createElement("img")
              img.src = imageUrl
              img.style.maxWidth = "100%"
              img.style.height = "auto"

              const selection = window.getSelection()
              if (selection && selection.rangeCount > 0) {
                const range = selection.getRangeAt(0)
                range.insertNode(img)
                range.collapse(false)
              }

              if (editorRef.current) {
                onChange(editorRef.current.innerHTML)
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}
