import { useState } from 'react'
import { Badge, CheckCircle, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import type { QuotaInfo } from '../types'

type CopyStep = 1 | 2

export default function CopyBadge() {
  const [currentStep, setCurrentStep] = useState<CopyStep>(1)
  const [readerConnected, setReaderConnected] = useState(false)
  const [badgeDetected, setBadgeDetected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const quotaInfo: QuotaInfo = {
    used: 1,
    total: 15,
    remaining: 14,
  }

  const handleConnectReader = async () => {
    setIsLoading(true)
    // Simulate reader connection
    setTimeout(() => {
      setReaderConnected(true)
      setCurrentStep(2)
      toast.success('Lecteur connecté avec succès')
      setIsLoading(false)
    }, 1500)
  }

  const handleCopyBadge = async () => {
    if (!readerConnected || !badgeDetected) {
      toast.error('Veuillez passer à l\'étape précédente')
      return
    }

    setIsLoading(true)
    // Simulate badge copy
    setTimeout(() => {
      toast.success('Badge copié avec succès! ✨')
      setIsLoading(false)
      // Reset
      setReaderConnected(false)
      setBadgeDetected(false)
      setCurrentStep(1)
    }, 2500)
  }

  const handlePlaceBadge = () => {
    if (!readerConnected) {
      toast.error('Veuillez d\'abord connecter le lecteur')
      return
    }
    
    setIsLoading(true)
    // Simulate badge detection
    setTimeout(() => {
      setBadgeDetected(true)
      toast.success('Badge détecté! Prêt à copier.')
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Copier un Badge</h1>
        <p className="text-gray-500 mt-1">Suivez les étapes pour copier un badge RFID</p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quota Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 card-shadow-lg sticky top-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quota Disponible</h2>
            
            <div className="mb-6">
              <div className="text-4xl font-bold text-blue-600">{quotaInfo.remaining}</div>
              <p className="text-sm text-gray-600 mt-1">badges restants ce mois</p>
            </div>

            <div className="space-y-3 pb-4 border-b border-gray-200">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Utilisé</span>
                <span className="font-semibold text-gray-900">{quotaInfo.used}/{quotaInfo.total}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${(quotaInfo.used / quotaInfo.total) * 100}%` }}
                ></div>
              </div>
            </div>

            {quotaInfo.remaining <= 5 && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-xs text-yellow-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Quota faible, contactez votre administrateur
                </p>
              </div>
            )}

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xs text-blue-800">
                💡 <span className="font-semibold">Astuce:</span> Gardez le badge stable pendant la copie
              </p>
            </div>
          </div>
        </div>

        {/* Copy Process */}
        <div className="lg:col-span-2">
          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-8 mb-12">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div
                className={`step-circle ${
                  currentStep === 1 ? 'active' : currentStep > 1 ? 'completed' : 'inactive'
                }`}
              >
                {currentStep > 1 ? <CheckCircle className="w-8 h-8" /> : '1'}
              </div>
              <p className="step-label mt-3">Connecter le lecteur</p>
            </div>

            {/* Connector */}
            <div className={`step-connector ${currentStep > 1 ? 'active' : ''}`}></div>

            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div
                className={`step-circle ${
                  currentStep === 2 ? 'active' : currentStep > 2 ? 'completed' : 'inactive'
                }`}
              >
                {currentStep > 2 ? <CheckCircle className="w-8 h-8" /> : '2'}
              </div>
              <p className="step-label mt-3">Placer le badge</p>
            </div>
          </div>

          {/* Step 1: Connect Reader */}
          {currentStep === 1 && (
            <div className="bg-white rounded-xl p-8 card-shadow-lg">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-50 rounded-full mb-6">
                  <Badge className="w-10 h-10 text-orange-500 badge-floating" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Étape 1: Connecter le lecteur</h3>
                <p className="text-gray-600 mb-8">
                  Assurez-vous que votre lecteur ACR122U est physiquement connecté à votre ordinateur
                </p>

                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <div className={`w-3 h-3 rounded-full ${readerConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className="font-medium text-gray-900">
                      {readerConnected ? 'Lecteur connecté' : 'Lecteur déconnecté'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">ACR122U - Détection automatique</p>
                </div>

                <button
                  onClick={handleConnectReader}
                  disabled={readerConnected || isLoading}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed min-w-64 mb-4"
                  title={readerConnected ? 'Lecteur déjà connecté' : 'Connecter le lecteur'}
                  aria-label={readerConnected ? 'Lecteur déjà connecté' : 'Connecter le lecteur'}
                >
                  {isLoading ? '⏳ Connexion en cours...' : readerConnected ? '✓ Connecté' : 'Détectez le lecteur'}
                </button>

                {!readerConnected && (
                  <p className="text-sm text-gray-500">
                    Cliquez pour établir la connexion avec le lecteur
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Place Badge */}
          {currentStep === 2 && (
            <div className="bg-white rounded-xl p-8 card-shadow-lg">
              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 transition-all ${
                  badgeDetected
                    ? 'bg-green-50'
                    : 'bg-blue-50'
                }`}>
                  <Badge className={`w-10 h-10 ${badgeDetected ? 'text-green-500' : 'text-blue-500'} ${!badgeDetected ? 'badge-floating' : ''}`} />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2">Étape 2: Placer le badge</h3>
                <p className="text-gray-600 mb-8">
                  Placez le badge sur le lecteur et attendez la détection
                </p>

                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <div className={`w-3 h-3 rounded-full ${badgeDetected ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                    <span className="font-medium text-gray-900">
                      {badgeDetected ? 'Badge détecté' : 'En attente...'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {badgeDetected ? 'Badge prêt à copier' : 'Aucun badge détecté'}
                  </p>
                </div>

                {!badgeDetected && (
                  <button
                    onClick={handlePlaceBadge}
                    disabled={isLoading || !readerConnected}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed min-w-64 mb-4"
                    title="Déttecter le badge"
                    aria-label="Déttecter le badge"
                  >
                    {isLoading ? '🔍 Détection...' : 'Vérifier la détection'}
                  </button>
                )}

                {badgeDetected && (
                  <button
                    onClick={handleCopyBadge}
                    disabled={isLoading || !readerConnected || !badgeDetected}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed min-w-64 mb-4"
                    title="Copier le badge"
                    aria-label="Copier le badge"
                  >
                    {isLoading ? '⏳ Copie en cours...' : '✓ Copier le badge'}
                  </button>
                )}

                {!badgeDetected && !isLoading && (
                  <p className="text-sm text-gray-500">
                    Placez le badge sur le lecteur et cliquez pour vérifier
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Success Message */}
          {badgeDetected && !isLoading && currentStep === 2 && (
            <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-6 flex items-center gap-4">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-green-900">Badge détecté!</h4>
                <p className="text-sm text-green-700">Vous pouvez maintenant procéder à la copie</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Help Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 card-shadow">
          <h4 className="font-semibold text-gray-900 mb-2">🔌 Lecteur</h4>
          <p className="text-sm text-gray-600">Assurez-vous que le lecteur ACR122U est connecté via USB</p>
        </div>
        <div className="bg-white rounded-lg p-4 card-shadow">
          <h4 className="font-semibold text-gray-900 mb-2">🏷️ Badge</h4>
          <p className="text-sm text-gray-600">Utilisez un badge RFID compatible avec votre lecteur</p>
        </div>
        <div className="bg-white rounded-lg p-4 card-shadow">
          <h4 className="font-semibold text-gray-900 mb-2">✅ Copie</h4>
          <p className="text-sm text-gray-600">La copie prend généralement 1-2 secondes</p>
        </div>
      </div>
    </div>
  )
}
