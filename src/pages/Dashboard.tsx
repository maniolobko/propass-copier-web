import { RefreshCw, Copy, Zap, TrendingUp } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import toast from 'react-hot-toast'
import type { Statistic, QuotaInfo } from '../types'

interface DashboardProps {
  onNavigateToCopy: () => void
}

export default function Dashboard({ onNavigateToCopy }: DashboardProps) {
  const quotaInfo: QuotaInfo = {
    used: 1,
    total: 15,
    remaining: 14,
  }

  const statistics: Statistic[] = [
    { label: 'Copies totales', value: 42, icon: '📋' },
    { label: 'Cette semaine', value: 5, icon: '📈' },
    { label: 'Limite mensuelle', value: 60, icon: '📊' },
  ]

  const donutData = [
    { name: 'Utilisé', value: quotaInfo.used, color: '#3b82f6' },
    { name: 'Disponible', value: quotaInfo.remaining, color: '#e2e8f0' },
  ]

  const handleRefresh = () => {
    toast.success('Données rafraîchies')
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Accueil</h1>
          <p className="text-gray-500 mt-1">Bienvenue sur votre tableau de bord PROPASS</p>
        </div>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          title="Rafraîchir les données"
          aria-label="Rafraîchir les données"
        >
          <RefreshCw className="w-4 h-4" />
          Rafraîchir
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quota Card - Left Column */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 card-shadow-lg">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Quota de Copie</h2>
            
            {/* Donut Chart */}
            <div className="donut-chart-container -mx-6">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={donutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {donutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="donut-center-text">
                <div className="donut-center-number">{quotaInfo.used}/{quotaInfo.total}</div>
                <div className="donut-center-label">Utilisation</div>
              </div>
            </div>

            {/* Quota Details */}
            <div className="mt-6 space-y-3 border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Utilisé</span>
                <span className="font-semibold text-gray-900">{quotaInfo.used} badges</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Disponible</span>
                <span className="font-semibold text-green-600">{quotaInfo.remaining} badges</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total</span>
                <span className="font-semibold text-gray-900">{quotaInfo.total} badges</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(quotaInfo.used / quotaInfo.total) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={onNavigateToCopy}
              className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              title="Copier un badge"
              aria-label="Copier un badge"
            >
              <Copy className="w-4 h-4" />
              Copier un badge
            </button>
          </div>
        </div>

        {/* Statistics - Right Column */}
        <div className="lg:col-span-2 space-y-4">
          {statistics.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 card-shadow flex items-center gap-4">
              <div className="text-4xl">{stat.icon}</div>
              <div className="flex-1">
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <TrendingUp className="w-5 h-5 text-blue-600 opacity-20" />
            </div>
          ))}

          {/* Additional Info Box */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
            <h3 className="font-semibold text-gray-900 mb-2">💡 Conseil</h3>
            <p className="text-sm text-gray-700">
              Vous pouvez copier jusqu'à <span className="font-semibold">{quotaInfo.remaining} badges</span> ce mois-ci.
              Assurez-vous que le lecteur est bien connecté avant de commencer.
            </p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-white rounded-xl p-6 card-shadow-lg">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Activité récente</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Zap className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-700">Badge copié avec succès</span>
            </div>
            <span className="text-xs text-gray-500">Aujourd'hui à 14:32</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Zap className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-700">Lecteur détecté</span>
            </div>
            <span className="text-xs text-gray-500">Aujourd'hui à 14:28</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <Zap className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-700">Connexion établie</span>
            </div>
            <span className="text-xs text-gray-500">Aujourd'hui à 14:25</span>
          </div>
        </div>
      </div>
    </div>
  )
}
