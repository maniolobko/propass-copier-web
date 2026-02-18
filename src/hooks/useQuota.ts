import { useState, useCallback, useEffect } from 'react'
import { useFetch, usePost } from './useFetch'
import { APP_CONFIG } from '../config'

export interface QuotaInfo {
  used: number
  total: number
  remaining: number
  resetDate: string
  last_copy?: number
}

export function useQuota() {
  const [quota, setQuota] = useState<QuotaInfo>({
    used: 0,
    total: 15,
    remaining: 15,
    resetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  })

  const { data: fetchedQuota, refetch } = useFetch<QuotaInfo>('/quota', {
    onSuccess: (data) => {
      setQuota(data as QuotaInfo)
    },
  })

  const { post: updateQuotaPost } = usePost('/quota/update')

  // Reload quota periodically
  useEffect(() => {
    const interval = setInterval(() => {
      refetch()
    }, APP_CONFIG.QUOTE_RELOAD_INTERVAL)

    return () => clearInterval(interval)
  }, [refetch])

  const decrementQuota = useCallback(async () => {
    try {
      const newQuota = await updateQuotaPost({ action: 'decrement' })
      setQuota(newQuota)
      return true
    } catch (error) {
      return false
    }
  }, [updateQuotaPost])

  const checkQuotaAvailable = useCallback(() => {
    return quota.remaining > 0
  }, [quota.remaining])

  return {
    quota,
    refetch,
    decrementQuota,
    checkQuotaAvailable,
    quotaPercentage: (quota.used / quota.total) * 100,
  }
}
