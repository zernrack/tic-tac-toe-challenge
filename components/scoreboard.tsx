"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { ScoreboardProps } from "@/types/game"

export function Scoreboard({ players, stats, onResetStats }: ScoreboardProps) {
  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-50">
      <CardHeader className="pb-3 sm:pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center gap-2">
            🏆 Scoreboard
          </CardTitle>
          <Button
            onClick={onResetStats}
            variant="ghost"
            size="sm"
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            Reset Stats
          </Button>
        </div>
        <Separator />
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="text-center p-3 sm:p-4 bg-blue-100 rounded-lg border-2 border-blue-200">
            <div className="text-xl sm:text-2xl font-bold text-blue-700">{stats.player1Wins}</div>
            <div className="text-xs sm:text-sm font-medium text-blue-600 truncate">{players.player1}</div>
            <div className="text-xs text-blue-500">Wins</div>
          </div>
          <div className="text-center p-3 sm:p-4 bg-purple-100 rounded-lg border-2 border-purple-200">
            <div className="text-xl sm:text-2xl font-bold text-purple-700">{stats.player2Wins}</div>
            <div className="text-xs sm:text-sm font-medium text-purple-600 truncate">{players.player2}</div>
            <div className="text-xs text-purple-500">Wins</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center">
          <div className="p-2 sm:p-3 bg-gray-100 rounded-lg">
            <div className="text-base sm:text-lg font-bold text-gray-700">{stats.draws}</div>
            <div className="text-xs text-gray-500">Draws</div>
          </div>
          <div className="p-2 sm:p-3 bg-gray-100 rounded-lg">
            <div className="text-base sm:text-lg font-bold text-gray-700">{stats.totalGames}</div>
            <div className="text-xs text-gray-500">Total Games</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
