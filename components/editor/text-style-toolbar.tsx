"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Link,
  ImageIcon,
  Smile,
  Palette,
} from "lucide-react"

interface TextStyleToolbarProps {
  onStyleApply: (style: string, value?: string) => void
  onToggleStylePanel: () => void
  onToggleEmojiPicker: () => void
  showStylePanel: boolean
  showEmojiPicker: boolean
}

export function TextStyleToolbar({
  onStyleApply,
  onToggleStylePanel,
  onToggleEmojiPicker,
  showStylePanel,
  showEmojiPicker,
}: TextStyleToolbarProps) {
  return (
    <div className="flex items-center gap-1 p-3 bg-gray-50 border-b border-gray-200 flex-wrap">
      {/* Basic Formatting */}
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" onClick={() => onStyleApply("bold")} className="h-8 w-8 p-0">
          <Bold className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onStyleApply("italic")} className="h-8 w-8 p-0">
          <Italic className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onStyleApply("underline")} className="h-8 w-8 p-0">
          <Underline className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onStyleApply("strikeThrough")} className="h-8 w-8 p-0">
          <Strikethrough className="h-4 w-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6" />

      {/* Alignment */}
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" onClick={() => onStyleApply("justifyLeft")} className="h-8 w-8 p-0">
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onStyleApply("justifyCenter")} className="h-8 w-8 p-0">
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onStyleApply("justifyRight")} className="h-8 w-8 p-0">
          <AlignRight className="h-4 w-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6" />

      {/* Lists */}
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" onClick={() => onStyleApply("insertUnorderedList")} className="h-8 w-8 p-0">
          <List className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onStyleApply("insertOrderedList")} className="h-8 w-8 p-0">
          <ListOrdered className="h-4 w-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6" />

      {/* Advanced Tools */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            const url = prompt("Enter URL:")
            if (url) onStyleApply("createLink", url)
          }}
          className="h-8 w-8 p-0"
        >
          <Link className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleEmojiPicker}
          className={`h-8 w-8 p-0 ${showEmojiPicker ? "bg-stack-blue text-white" : ""}`}
        >
          <Smile className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleStylePanel}
          className={`h-8 w-8 p-0 ${showStylePanel ? "bg-stack-blue text-white" : ""}`}
        >
          <Palette className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onStyleApply("insertImage")} className="h-8 w-8 p-0">
          <ImageIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
