import { useState, useEffect, useCallback } from 'react'
import { API_CONFIG } from '../config'
import toast from 'react-hot-toast'

interface UseFetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  headers?: Record<string, string>
  body?: Record<string, unknown>
  skip?: boolean
  onSuccess?: (data: unknown) => void
  onError?: (error: Error) => void
}

interface UseFetchState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

export function useFetch<T = unknown>(url: string, options?: UseFetchOptions) {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const fetch = useCallback(async () => {
    if (options?.skip) return

    setState(s => ({ ...s, loading: true, error: null }))

    try {
      const fullUrl = `${API_CONFIG.BASE_URL}${url}`
      const response = await window.fetch(fullUrl, {
        method: options?.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...(options?.body && { body: JSON.stringify(options.body) }),
      })

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      setState({ data, loading: false, error: null })
      options?.onSuccess?.(data)
      return data
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      setState(s => ({ ...s, loading: false, error: err }))
      options?.onError?.(err)
      toast.error(`Erreur: ${err.message}`)
    }
  }, [url, options])

  useEffect(() => {
    if (options?.method === 'GET' && !options?.skip) {
      fetch()
    }
  }, [fetch, options?.skip, options?.method])

  return { ...state, refetch: fetch }
}

export function usePost<T = unknown>(url: string, body?: Record<string, unknown>) {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const post = useCallback(async (data?: Record<string, unknown>) => {
    setState(s => ({ ...s, loading: true, error: null }))

    try {
      const fullUrl = `${API_CONFIG.BASE_URL}${url}`
      const response = await window.fetch(fullUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data || body),
      })

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`)
      }

      const result = await response.json()
      setState({ data: result, loading: false, error: null })
      return result
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      setState(s => ({ ...s, loading: false, error: err }))
      toast.error(`Erreur: ${err.message}`)
      throw err
    }
  }, [url, body])

  return { ...state, post }
}
