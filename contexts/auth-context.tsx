"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { authApi } from "@/lib/api"
import type { AuthContextType, User, AuthState } from "@/lib/auth-types"

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Initial auth state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthState>(initialState)
  const router = useRouter()

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Check if token exists
        const token = localStorage.getItem("mathworld_token")

        if (!token) {
          setAuth({ ...initialState, isLoading: false })
          return
        }

        // Verify token and get user data
        const userData = await authApi.getCurrentUser()

        setAuth({
          user: userData,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        })
      } catch (error) {
        console.error("Auth check failed:", error)
        // Clear invalid token
        localStorage.removeItem("mathworld_token")
        document.cookie = "mathworld_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"

        setAuth({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: "Session expired. Please log in again.",
        })
      }
    }

    checkAuthStatus()
  }, [])

  // Login function
  const login = async (email: string, password: string) => {
    setAuth((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      const data = await authApi.login(email, password)

      // Store token in localStorage for client-side auth
      localStorage.setItem("mathworld_token", data.token)

      // Set token in cookie for server-side auth
      document.cookie = `mathworld_token=${data.token}; path=/; max-age=604800; SameSite=Strict`

      setAuth({
        user: data.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      })

      // Redirect to home page
      router.push("/home")
    } catch (error: any) {
      setAuth((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message || "Login failed. Please try again.",
      }))
    }
  }

  // Register function
  const register = async (name: string, email: string, password: string) => {
    setAuth((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      const data = await authApi.register(name, email, password)

      // Store token in localStorage for client-side auth
      localStorage.setItem("mathworld_token", data.token)

      // Set token in cookie for server-side auth
      document.cookie = `mathworld_token=${data.token}; path=/; max-age=604800; SameSite=Strict`

      setAuth({
        user: data.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      })

      // Redirect to home page
      router.push("/home")
    } catch (error: any) {
      setAuth((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message || "Registration failed. Please try again.",
      }))
    }
  }

  // Logout function
  const logout = async () => {
    setAuth((prev) => ({ ...prev, isLoading: true }))

    try {
      await authApi.logout()

      // Clear token from localStorage and cookie
      localStorage.removeItem("mathworld_token")
      document.cookie = "mathworld_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"

      setAuth({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      })

      // Redirect to landing page
      router.push("/landing")
    } catch (error) {
      console.error("Logout failed:", error)
      // Still clear local auth state even if API call fails
      localStorage.removeItem("mathworld_token")
      document.cookie = "mathworld_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"

      setAuth({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      })

      router.push("/landing")
    }
  }

  // Reset password function
  const resetPassword = async (email: string) => {
    setAuth((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      await authApi.resetPassword(email)
      setAuth((prev) => ({ ...prev, isLoading: false }))
      return
    } catch (error: any) {
      setAuth((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message || "Password reset failed. Please try again.",
      }))
    }
  }

  // Update profile function
  const updateProfile = async (userData: Partial<User>) => {
    setAuth((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      const updatedUser = await authApi.updateProfile(userData)

      setAuth((prev) => ({
        ...prev,
        user: updatedUser,
        isLoading: false,
      }))
    } catch (error: any) {
      setAuth((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message || "Profile update failed. Please try again.",
      }))
    }
  }

  // Clear error function
  const clearError = () => {
    setAuth((prev) => ({ ...prev, error: null }))
  }

  // Context value
  const value: AuthContextType = {
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.isLoading,
    error: auth.error,
    login,
    register,
    logout,
    resetPassword,
    updateProfile,
    clearError,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}
