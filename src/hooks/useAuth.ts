import { useState, useCallback, useEffect } from 'react'
import { usePost } from './useFetch'
import toast from 'react-hot-toast'

export interface User {
  id: string
  username: string
  email: string
  role: 'Admin' | 'Client' | 'Viewer'
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

const STORAGE_KEY = 'propass_auth'

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch (e) {
        return { user: null, token: null, isAuthenticated: false, isLoading: false }
      }
    }
    return { user: null, token: null, isAuthenticated: false, isLoading: false }
  })

  const { post: loginPost } = usePost('/auth/login')
  const { post: logoutPost } = usePost('/auth/logout')

  const login = useCallback(async (username: string, password: string) => {
    setAuthState(s => ({ ...s, isLoading: true }))
    try {
      const data = await loginPost({ username, password })
      setAuthState({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
        isLoading: false,
      })
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
        isLoading: false,
      }))
      toast.success('Connexion réussie')
      return true
    } catch (error) {
      setAuthState(s => ({ ...s, isLoading: false }))
      toast.error('Erreur de connexion')
      return false
    }
  }, [loginPost])

  const logout = useCallback(async () => {
    setAuthState(s => ({ ...s, isLoading: true }))
    try {
      await logoutPost()
    } catch (error) {
      // Ignore logout errors
    }
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    })
    localStorage.removeItem(STORAGE_KEY)
    toast.success('Déconnexion réussie')
  }, [logoutPost])

  return {
    ...authState,
    login,
    logout,
  }
}
