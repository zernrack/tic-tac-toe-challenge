"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface PlayerSetupProps {
  onStartGame: (player1: string, player2: string) => void
}

interface GameStats {
  player1Wins: number
  player2Wins: number
  draws: number
  totalGames: number
}

function PlayerSetup({ onStartGame }: PlayerSetupProps) {
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

interface ScoreboardProps {
  players: { player1: string; player2: string }
  stats: GameStats
  onResetStats: () => void
}

function Scoreboard({ players, stats, onResetStats }: ScoreboardProps) {
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

interface SquareProps {
  value: string | null
  onSquareClick: () => void
  isWinning?: boolean
}

function Square({ value, onSquareClick, isWinning = false }: SquareProps) {
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

interface BoardProps {
  xIsNext: boolean
  squares: (string | null)[]
  onPlay: (nextSquares: (string | null)[]) => void
  players: { player1: string; player2: string }
}

function Board({ xIsNext, squares, onPlay, players }: BoardProps) {
  function handleClick(i: number) {
    if (calculateWinner(squares)?.winner || squares[i]) {
      return
    }
    const nextSquares = squares.slice()
    if (xIsNext) {
      nextSquares[i] = "X"
    } else {
      nextSquares[i] = "O"
    }
    onPlay(nextSquares)
  }

  const result = calculateWinner(squares)
  const winner = result?.winner
  const winningLine = result?.line || []

  let status
  let statusColor = ""

  if (winner) {
    const winnerName = winner === "X" ? players.player1 : players.player2
    status = `🎉 ${winnerName} Wins!`
    statusColor = winner === "X" ? "text-blue-600" : "text-purple-600"
  } else if (squares.every((square) => square !== null)) {
    status = "It's a Draw! 🤝"
    statusColor = "text-gray-600"
  } else {
    const currentPlayer = xIsNext ? players.player1 : players.player2
    status = `${currentPlayer}'s Turn`
    statusColor = xIsNext ? "text-blue-600" : "text-purple-600"
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center space-y-2">
        <div className={`text-xl sm:text-2xl font-bold ${statusColor}`}>{status}</div>
        {!winner && !squares.every((square) => square !== null) && (
          <Badge
            variant="outline"
            className={`text-base sm:text-lg px-3 sm:px-4 py-1 ${
              xIsNext ? "border-blue-200 text-blue-700 bg-blue-50" : "border-purple-200 text-purple-700 bg-purple-50"
            }`}
          >
            {xIsNext ? "X" : "O"}
          </Badge>
        )}
      </div>
      <div className="grid grid-cols-3 gap-2 sm:gap-3 w-fit mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg border">
        {squares.map((square, i) => (
          <Square key={i} value={square} onSquareClick={() => handleClick(i)} isWinning={winningLine.includes(i)} />
        ))}
      </div>
    </div>
  )
}

export default function Game() {
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
    const isGameComplete = result?.winner || nextSquares.every((square) => square !== null)

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

  const moves = history.map((squares, move) => {
    const description = move > 0 ? `Move #${move}` : "Game Start"
    return (
      <li key={move} className="mb-2">
        <Button
          variant={move === currentMove ? "default" : "outline"}
          size="sm"
          onClick={() => jumpTo(move)}
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
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function calculateWinner(squares: (string | null)[]): { winner: string; line: number[] } | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] }
    }
  }
  return null
}