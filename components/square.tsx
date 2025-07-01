"use client"

import { Button } from "@/components/ui/button"
import type { SquareProps } from "@/types/game"

export function Square({ value, onSquareClick, isWinning = false }: SquareProps) {
  return (
    <Button
      className={`w-16 h-16 sm:w-20 sm:h-20 text-2xl sm:text-3xl font-bold border-2 transition-all duration-200 transform hover:scale-105 ${
        value === "X"
          ? "text-blue-600 bg-blue-50 border-blue-200 hover:bg-blue-100"
          : value === "O"
            ? "text-purple-600 bg-purple-50 border-purple-200 hover:bg-purple-100"
            : "border-gray-200 hover:bg-gray-50 hover:border-gray-300"
      } ${isWinning ? "ring-4 ring-yellow-400 bg-yellow-50" : ""}`}
      variant="outline"
      onClick={onSquareClick}
      disabled={value !== null}
    >
      {value}
    </Button>
  )
}
