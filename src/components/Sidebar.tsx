import { Badge, Wifi, LogOut, CreditCard } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import type { Page } from '../types'

interface SidebarProps {
  currentPage: Page
  onNavigate: (page: Page) => void
  onLogout?: () => void
}

export default function Sidebar({ currentPage, onNavigate, onLogout }: SidebarProps) {
  const user = (() => {
    const storedUser = localStorage.getItem('auth_user')
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser)
        return {
          name: parsed.email?.split('@')[0] || 'Utilisateur',
          role: parsed.role || 'Client',
          email: parsed.email || 'client@rfid.local',
        }
      } catch {
        return {
          name: 'Utilisateur',
          role: 'Client',
          email: 'client@rfid.local',
        }
      }
    }
    return {
      name: 'Utilisateur',
      role: 'Client',
      email: 'client@rfid.local',
    }
  })()

  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    }
  }

  return (
    <div className="w-sidebar bg-white border-r border-gray-200 flex flex-col h-screen shadow-sm">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Badge className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">PROPASS</span>
        </div>
      </div>

      {/* User Info */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-semibold text-blue-600">{user.name.charAt(0).toUpperCase()}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
            <p className="text-xs text-gray-500">{user.role}</p>
            <p className="text-xs text-gray-400 truncate">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Reader Status */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">Lecteur déconnecté</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Wifi className="w-3 h-3" />
          <span>ACR122U</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          <button
            onClick={() => onNavigate('home')}
            className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
              currentPage === 'home'
                ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
            title="Aller à l'accueil"
            aria-label="Aller à l'accueil"
          >
            Accueil
          </button>
          <button
            onClick={() => onNavigate('copy')}
            className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
              currentPage === 'copy'
                ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
            title="Copier un badge"
            aria-label="Copier un badge"
          >
            Copier un badge
          </button>
          <button
            onClick={() => onNavigate('reload')}
            className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              currentPage === 'reload'
                ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
            title="Recharger un badge"
            aria-label="Recharger un badge"
          >
            <CreditCard className="w-4 h-4" />
            Recharger
          </button>
        </div>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors font-medium text-sm"
          title="Se déconnecter"
          aria-label="Se déconnecter"
        >
          <LogOut className="w-4 h-4" />
          Déconnexion
        </button>
      </div>
    </div>
  )
}
