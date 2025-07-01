import { Badge } from "@/components/ui/badge"
import { Square } from "@/components/square"
import { calculateWinner } from "@/utils/game-logic"
import type { BoardProps } from "@/types/game"

export function Board({ xIsNext, squares, onPlay, players }: BoardProps) {
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
