import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import CopyBadge from './pages/CopyBadge'
import type { Page } from './types'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {currentPage === 'home' && <Dashboard onNavigateToCopy={() => setCurrentPage('copy')} />}
        {currentPage === 'copy' && <CopyBadge />}
      </main>
    </div>
  )
}

export default App
