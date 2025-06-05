'use client'

import { useRef } from "react"
import { useMousePosition } from "./hooks/UseMousePosition"
import { motion } from "framer-motion"

export default function CustomCursor() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mousePosition = useMousePosition()

  return (
    <motion.div
      className="pointer-events-none fixed z-50 w-6 h-6 bg-gray-200 rounded-full shadow-md shadow-orange-600"
      style={{
        left: mousePosition.x - 8,
        top: mousePosition.y - 8,
      }}
    />
  )
}
