// Simple auth store using localStorage
export interface User {
  id: number
  email: string
  role: string
}

export const useAuthStore = () => {
  const getToken = () => localStorage.getItem('auth_token')
  const getUser = (): User | null => {
    const user = localStorage.getItem('auth_user')
    return user ? JSON.parse(user) : null
  }
  const isAuthenticated = () => !!getToken() && !!getUser()

  const login = (token: string, user: User) => {
    localStorage.setItem('auth_token', token)
    localStorage.setItem('auth_user', JSON.stringify(user))
  }

  const logout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
  }

  return {
    token: getToken(),
    user: getUser(),
    isAuthenticated: isAuthenticated(),
    login,
    logout,
  }
}
