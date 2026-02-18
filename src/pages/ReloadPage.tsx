import { useState, useEffect } from 'react'
import { CreditCard, Plus, Minus, Send, Loader } from 'lucide-react'
import toast from 'react-hot-toast'
import { API_CONFIG } from '../config'

interface Client {
  id: number
  name: string
  email: string
  balance: number
}

export default function ReloadPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [amount, setAmount] = useState<string>('10')
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)

  // Get auth token
  const token = localStorage.getItem('auth_token')

  // Fetch available clients
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(`${API_CONFIG.BASE_URL}/clients`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const data = await response.json()
        if (data.success) {
          setClients(data.data)
          if (data.data.length > 0) {
            setSelectedClient(data.data[0])
          }
        }
      } catch (error) {
        console.error('Error fetching clients:', error)
        toast.error('Erreur lors du chargement des clients')
      } finally {
        setIsFetching(false)
      }
    }

    if (token) {
      fetchClients()
    }
  }, [token])

  const handleReload = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedClient || !amount || parseFloat(amount) <= 0) {
      toast.error('Veuillez sélectionner un client et un montant valide')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(
        `${API_CONFIG.BASE_URL}/clients/${selectedClient.id}/reload`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            amount: parseFloat(amount),
            description: `Recharge manuelle de ${amount}€`,
          }),
        }
      )

      const data = await response.json()

      if (response.ok && data.success) {
        toast.success(`Recharge réussie! Nouveau solde: ${data.data.client.balance}€`)
        setSelectedClient({
          ...selectedClient,
          balance: data.data.client.balance,
        })
        setAmount('10')

        // Refresh clients list
        const clientsResponse = await fetch(`${API_CONFIG.BASE_URL}/clients`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const clientsData = await clientsResponse.json()
        if (clientsData.success) {
          setClients(clientsData.data)
        }
      } else {
        toast.error(data.error || 'Erreur lors de la recharge')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Erreur de connexion au serveur')
    } finally {
      setIsLoading(false)
    }
  }

  const quickAmounts = [5, 10, 20, 50]

  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-blue-600 mx-auto" />
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <CreditCard className="w-8 h-8 text-blue-600" />
          Recharger un Badge
        </h1>
        <p className="text-gray-500 mt-2">
          Ajouter des crédits au solde d'un client en temps réel
        </p>
      </div>

      {clients.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <p className="text-yellow-800">Aucun client disponible. Veuillez en créer un d'abord.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleReload} className="bg-white rounded-lg shadow-md p-6 space-y-6">
              {/* Client Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Client à recharger
                </label>
                <select
                  value={selectedClient?.id || ''}
                  onChange={(e) => {
                    const client = clients.find((c) => c.id === parseInt(e.target.value))
                    setSelectedClient(client || null)
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name} - {client.email}
                    </option>
                  ))}
                </select>
              </div>

              {/* Current Balance */}
              {selectedClient && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Solde actuel</p>
                  <p className="text-2xl font-bold text-blue-600">{selectedClient.balance}€</p>
                </div>
              )}

              {/* Amount Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Montant à recharger
                </label>
                <div className="space-y-4">
                  {/* Quick amounts */}
                  <div className="grid grid-cols-4 gap-2">
                    {quickAmounts.map((quickAmount) => (
                      <button
                        key={quickAmount}
                        type="button"
                        onClick={() => setAmount(quickAmount.toString())}
                        className={`py-2 rounded-lg font-medium transition-colors ${
                          amount === quickAmount.toString()
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        +{quickAmount}€
                      </button>
                    ))}
                  </div>

                  {/* Custom amount */}
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Montant personnalisé"
                        min="0"
                        step="0.01"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                      <span className="absolute right-3 top-2 text-gray-500 font-medium">€</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* New Balance Preview */}
              {selectedClient && amount && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Nouveau solde</p>
                  <p className="text-2xl font-bold text-green-600">
                    {(selectedClient.balance + parseFloat(amount || 0)).toFixed(2)}€
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Recharge en cours...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Valider la recharge
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Info Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  À propos
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Recharger le solde d'un client en temps réel. Cette action est immédiatement
                  synchronisée avec l'application Electron et visible à tous les appareils connectés.
                </p>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-900 mb-3">Clients actifs</h3>
                <div className="space-y-2">
                  {clients.map((client) => (
                    <div
                      key={client.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedClient?.id === client.id
                          ? 'bg-blue-100 border border-blue-300'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                      onClick={() => setSelectedClient(client)}
                    >
                      <p className="font-medium text-sm text-gray-900">{client.name}</p>
                      <p className="text-xs text-gray-600">{client.balance}€</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 text-sm">
                <p className="text-blue-900">
                  <strong>💡 Astuce:</strong> Les recharges sont conservées dans l'historique et
                  synchronisées en temps réel avec tous les appareils.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
