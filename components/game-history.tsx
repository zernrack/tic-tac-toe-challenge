"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { GameHistoryProps } from "@/types/game"

export function GameHistory({ history, currentMove, onJumpTo }: GameHistoryProps) {
  const moves = history.map((squares, move) => {
    const description = move > 0 ? `Move #${move}` : "Game Start"
    return (
      <li key={move} className="mb-2">
        <Button
          variant={move === currentMove ? "default" : "outline"}
          size="sm"
          onClick={() => onJumpTo(move)}
          className={`w-full text-left justify-start transition-all duration-200 text-sm ${
            move === currentMove
              ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
              : "hover:bg-gray-50"
          }`}
        >
          {description}
        </Button>
      </li>
    )
  })

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-gray-50 to-white">
      <CardHeader className="pb-3 sm:pb-4">
        <CardTitle className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center gap-2">
          📜 Game History
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="max-h-48 sm:max-h-64 overflow-y-auto">
        <ol className="space-y-1">{moves}</ol>
      </CardContent>
    </Card>
  )
}
