import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import CopyBadge from './pages/CopyBadge'
import ReloadPage from './pages/ReloadPage'
import LoginPage from './pages/LoginPage'
import { useAuthStore } from './store/authStore'
import type { Page } from './types'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem('auth_token')
    const user = localStorage.getItem('auth_user')
    setIsAuthenticated(!!token && !!user)
    setIsLoading(false)
  }, [])

  const handleLoginSuccess = () => {
    setIsAuthenticated(true)
    setCurrentPage('home')
  }

  const handleLogout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
    setIsAuthenticated(false)
    setCurrentPage('home')
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} onLogout={handleLogout} />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {currentPage === 'home' && <Dashboard onNavigateToCopy={() => setCurrentPage('copy')} />}
        {currentPage === 'copy' && <CopyBadge />}
        {currentPage === 'reload' && <ReloadPage />}
      </main>
    </div>
  )
}

export default App
