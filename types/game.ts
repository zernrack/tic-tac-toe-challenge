
export interface GameStats {
  player1Wins: number
  player2Wins: number
  draws: number
  totalGames: number
}

export interface PlayerSetupProps {
  onStartGame: (player1: string, player2: string) => void
}

export interface ScoreboardProps {
  players: { player1: string; player2: string }
  stats: GameStats
  onResetStats: () => void
}

export interface SquareProps {
  value: string | null
  onSquareClick: () => void
  isWinning?: boolean
}

export interface BoardProps {
  xIsNext: boolean
  squares: (string | null)[]
  onPlay: (nextSquares: (string | null)[]) => void
  players: { player1: string; player2: string }
}

export interface GameHistoryProps {
  history: (string | null)[][]
  currentMove: number
  onJumpTo: (move: number) => void
}
