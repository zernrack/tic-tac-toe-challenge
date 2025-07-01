"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlayerSetup } from "@/components/player-setup"
import { Scoreboard } from "@/components/scoreboard"
import { Board } from "./board"
import { GameHistory } from "./game-history"
import { calculateWinner } from "@/utils/game-logic"
import type { GameStats } from "@/types/game"

export function Game() {
  const [gameStarted, setGameStarted] = useState(false)
  const [players, setPlayers] = useState({ player1: "", player2: "" })
  const [history, setHistory] = useState<(string | null)[][]>([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove]
  const [stats, setStats] = useState<GameStats>({
    player1Wins: 0,
    player2Wins: 0,
    draws: 0,
    totalGames: 0,
  })

  function handleStartGame(player1: string, player2: string) {
    setPlayers({ player1, player2 })
    setGameStarted(true)
  }

  function handlePlay(nextSquares: (string | null)[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)

    // Check if game ended and update stats
    const result = calculateWinner(nextSquares)
    const isGameComplete = (result !== null) || nextSquares.every((square) => square !== null)

    if (isGameComplete && currentMove === history.length - 1) {
      setTimeout(() => {
        updateStats(result?.winner || null)
      }, 100)
    }
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove)
  }

  function updateStats(winner: string | null) {
    setStats((prev) => ({
      ...prev,
      player1Wins: prev.player1Wins + (winner === "X" ? 1 : 0),
      player2Wins: prev.player2Wins + (winner === "O" ? 1 : 0),
      draws: prev.draws + (winner === null ? 1 : 0),
      totalGames: prev.totalGames + 1,
    }))
  }

  function resetStats() {
    setStats({
      player1Wins: 0,
      player2Wins: 0,
      draws: 0,
      totalGames: 0,
    })
  }

  function resetGame() {
    setHistory([Array(9).fill(null)])
    setCurrentMove(0)
  }

  function newGame() {
    setGameStarted(false)
    setPlayers({ player1: "", player2: "" })
    setHistory([Array(9).fill(null)])
    setCurrentMove(0)
    resetStats()
  }

  if (!gameStarted) {
    return <PlayerSetup onStartGame={handleStartGame} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-2 sm:p-4">
      <div className="max-w-6xl mx-auto">
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-3 sm:space-y-4 pb-6 sm:pb-8 px-4 sm:px-6">
            <CardTitle className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Tic-Tac-Toe
            </CardTitle>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-base sm:text-lg">
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base">
                {players.player1} (X)
              </Badge>
              <span className="text-muted-foreground font-medium text-sm sm:text-base">VS</span>
              <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base">
                {players.player2} (O)
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 gap-4 lg:gap-8">
              <div className="xl:col-span-2 lg:col-span-2 space-y-4 lg:space-y-6">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} players={players} />
                <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
                  <Button
                    onClick={resetGame}
                    variant="outline"
                    className="px-4 sm:px-6 py-2 font-semibold hover:bg-gray-50 transition-colors bg-transparent text-sm sm:text-base"
                  >
                    🔄 Reset Game
                  </Button>
                  <Button
                    onClick={newGame}
                    variant="outline"
                    className="px-4 sm:px-6 py-2 font-semibold hover:bg-gray-50 transition-colors bg-transparent text-sm sm:text-base"
                  >
                    👥 New Players
                  </Button>
                </div>
              </div>
              <div className="space-y-4 sm:space-y-6">
                <Scoreboard players={players} stats={stats} onResetStats={resetStats} />
                <GameHistory history={history} currentMove={currentMove} onJumpTo={jumpTo} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
