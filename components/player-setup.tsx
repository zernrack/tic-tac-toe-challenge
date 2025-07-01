"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { PlayerSetupProps } from "@/types/game"

export function PlayerSetup({ onStartGame }: PlayerSetupProps) {
  const [player1Name, setPlayer1Name] = useState("")
  const [player2Name, setPlayer2Name] = useState("")

  const handleStartGame = () => {
    if (player1Name.trim() && player2Name.trim()) {
      onStartGame(player1Name.trim(), player2Name.trim())
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4 pb-8">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Tic-Tac-Toe
          </CardTitle>
          <p className="text-muted-foreground">Enter player names to begin</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="player1" className="text-sm font-semibold text-gray-700">
              Player 1 (X)
            </Label>
            <Input
              id="player1"
              placeholder="Enter first player name"
              value={player1Name}
              onChange={(e) => setPlayer1Name(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleStartGame()}
              className="h-12 text-lg border-2 focus:border-blue-500 transition-colors"
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="player2" className="text-sm font-semibold text-gray-700">
              Player 2 (O)
            </Label>
            <Input
              id="player2"
              placeholder="Enter second player name"
              value={player2Name}
              onChange={(e) => setPlayer2Name(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleStartGame()}
              className="h-12 text-lg border-2 focus:border-purple-500 transition-colors"
            />
          </div>
          <Button
            onClick={handleStartGame}
            disabled={!player1Name.trim() || !player2Name.trim()}
            className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
          >
            Start Game 🎮
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
