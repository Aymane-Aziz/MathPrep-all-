// API service for communicating with the backend

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

// Helper function for making authenticated requests
async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  // Get token from localStorage
  let token
  if (typeof window !== "undefined") {
    token = localStorage.getItem("mathworld_token")
  }

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  }

  try {
    // Make sure endpoint starts with /api
    const apiEndpoint = endpoint.startsWith("/api") ? endpoint : `/api${endpoint}`

    const response = await fetch(`${API_URL}${apiEndpoint}`, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || errorData.message || "An error occurred")
    }

    return await response.json()
  } catch (error) {
    console.error("API request failed:", error)
    throw error
  }
}

// Auth API calls
export const authApi = {
  login: async (email: string, password: string) => {
    const data = await fetchWithAuth("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })

    // Store token in localStorage
    if (data.token) {
      localStorage.setItem("mathworld_token", data.token)
    }

    return data
  },

  register: async (name: string, email: string, password: string) => {
    const data = await fetchWithAuth("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    })

    // Store token in localStorage if registration auto-logs in
    if (data.token) {
      localStorage.setItem("mathworld_token", data.token)
    }

    return data
  },

  logout: async () => {
    try {
      await fetchWithAuth("/auth/logout", {
        method: "POST",
      })
    } finally {
      // Remove token from localStorage
      localStorage.removeItem("mathworld_token")
    }
  },

  resetPassword: async (email: string) => {
    return await fetchWithAuth("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    })
  },

  getCurrentUser: async () => {
    return await fetchWithAuth("/auth/me")
  },

  updateProfile: async (userData: any) => {
    return await fetchWithAuth("/auth/profile", {
      method: "PUT",
      body: JSON.stringify(userData),
    })
  },
}

// Progress API calls
export const progressApi = {
  getProgress: async () => {
    return await fetchWithAuth("/progress")
  },

  updateGameProgress: async (gameId: string, stars: number) => {
    return await fetchWithAuth(`/progress/games/${gameId}`, {
      method: "PUT",
      body: JSON.stringify({ stars }),
    })
  },
}

// Achievements API calls
export const achievementsApi = {
  getAchievements: async () => {
    return await fetchWithAuth("/achievements")
  },

  unlockAchievement: async (achievementId: string) => {
    return await fetchWithAuth(`/achievements/${achievementId}/unlock`, {
      method: "POST",
    })
  },
}
