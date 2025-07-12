"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TextStylePanelProps {
  styles: {
    fontSize: number
    fontFamily: string
    color: string
    backgroundColor: string
    textAlign: string
    fontWeight: string
    fontStyle: string
    textDecoration: string
  }
  onStyleChange: (styles: any) => void
  onApplyToSelection: (styles: any) => void
}

export function TextStylePanel({ styles, onStyleChange, onApplyToSelection }: TextStylePanelProps) {
  const [localStyles, setLocalStyles] = useState(styles)

  const fontFamilies = [
    "Work Sans",
    "Inter",
    "Arial",
    "Helvetica",
    "Georgia",
    "Times New Roman",
    "Courier New",
    "Verdana",
  ]

  const colors = [
    "#000000",
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#FFA500",
    "#800080",
    "#008000",
    "#000080",
    "#800000",
    "#808080",
    "#C0C0C0",
  ]

  const updateStyle = (key: string, value: any) => {
    const newStyles = { ...localStyles, [key]: value }
    setLocalStyles(newStyles)
    onStyleChange(newStyles)
  }

  return (
    <div className="p-4 space-y-6 h-[400px] overflow-y-auto">
      {/* Font Size */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Font Size</Label>
        <div className="space-y-2">
          <Slider
            value={[localStyles.fontSize]}
            onValueChange={([value]) => updateStyle("fontSize", value)}
            min={8}
            max={72}
            step={1}
            className="w-full"
          />
          <div className="text-center text-sm text-gray-500">{localStyles.fontSize}px</div>
        </div>
      </div>

      {/* Font Family */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Font Family</Label>
        <Select value={localStyles.fontFamily} onValueChange={(value) => updateStyle("fontFamily", value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {fontFamilies.map((font) => (
              <SelectItem key={font} value={font} style={{ fontFamily: font }}>
                {font}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Text Color */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Text Color</Label>
        <div className="grid grid-cols-7 gap-2">
          {colors.map((color) => (
            <button
              key={color}
              className={`w-8 h-8 rounded border-2 ${
                localStyles.color === color ? "border-gray-400" : "border-gray-200"
              }`}
              style={{ backgroundColor: color }}
              onClick={() => updateStyle("color", color)}
            />
          ))}
        </div>
        <input
          type="color"
          value={localStyles.color}
          onChange={(e) => updateStyle("color", e.target.value)}
          className="w-full h-10 rounded border border-gray-200"
        />
      </div>

      {/* Background Color */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Background Color</Label>
        <div className="grid grid-cols-7 gap-2">
          <button
            className={`w-8 h-8 rounded border-2 ${
              localStyles.backgroundColor === "transparent" ? "border-gray-400" : "border-gray-200"
            } bg-white relative`}
            onClick={() => updateStyle("backgroundColor", "transparent")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-transparent to-red-500 opacity-20"></div>
          </button>
          {colors.slice(1).map((color) => (
            <button
              key={color}
              className={`w-8 h-8 rounded border-2 ${
                localStyles.backgroundColor === color ? "border-gray-400" : "border-gray-200"
              }`}
              style={{ backgroundColor: color }}
              onClick={() => updateStyle("backgroundColor", color)}
            />
          ))}
        </div>
      </div>

      {/* Text Effects */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Text Effects</Label>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant={localStyles.fontWeight === "bold" ? "default" : "outline"}
            size="sm"
            onClick={() => updateStyle("fontWeight", localStyles.fontWeight === "bold" ? "normal" : "bold")}
          >
            Bold
          </Button>
          <Button
            variant={localStyles.fontStyle === "italic" ? "default" : "outline"}
            size="sm"
            onClick={() => updateStyle("fontStyle", localStyles.fontStyle === "italic" ? "normal" : "italic")}
          >
            Italic
          </Button>
        </div>
      </div>

      {/* Apply Button */}
      <Button
        onClick={() => onApplyToSelection(localStyles)}
        className="w-full bg-stack-blue hover:bg-blue-700 text-white"
      >
        Apply to Selection
      </Button>
    </div>
  )
}
