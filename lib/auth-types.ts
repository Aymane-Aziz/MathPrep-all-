// Types for authentication and user data

export type User = {
  id: string
  name: string
  email: string
  avatar: string
  createdAt: string
}

export type AuthState = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export type Progress = {
  userId: string
  game1: number
  game2: number
  game3: number
  game4: number
  game5: number
  game6: number
  overallStar: number
}

export type GameProgress = {
  starsEarned: number
  levelsUnlocked: number
}

export type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
  clearError: () => void
}

export type ProgressContextType = {
  progress: Progress | null
  isLoading: boolean
  error: string | null
  updateGameProgress: (gameId: string, stars: number) => Promise<void>
  refreshProgress: () => Promise<void>
  getGameProgress: (gameId: string) => GameProgress | null
  getGameLevel: (gameId: string) => number
}
