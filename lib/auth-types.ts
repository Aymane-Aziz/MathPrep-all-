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
  topicId: string
  completed: number
  totalLessons: number
  lastAccessed: string
  score: number
  stars: number
}

export type GameProgress = {
  gameId: string
  level: number // Changed from highScore to level
  starsEarned: number
  levelsUnlocked: number
  lastPlayed: string
  achievements: string[]
}

export type UserProgress = {
  topics: Progress[]
  games: GameProgress[]
  totalStars: number
  totalScore: number
  streakDays: number
  lastLoginDate: string
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
  progress: UserProgress | null
  isLoading: boolean
  error: string | null
  updateTopicProgress: (topicId: string, data: Partial<Progress>) => Promise<void>
  updateGameProgress: (gameId: string, data: Partial<GameProgress>) => Promise<void>
  getTopicProgress: (topicId: string) => Progress | undefined
  getGameProgress: (gameId: string) => GameProgress | undefined
  getGameLevel: (gameId: string) => number
  refreshProgress: () => Promise<void>
}
