import { useState, useEffect } from 'react'
import { useFetch } from './useFetch'

interface ReaderStatus {
  isConnected: boolean
  model: string
  error?: string
}

export function useReaderStatus() {
  const [status, setStatus] = useState<ReaderStatus>({
    isConnected: false,
    model: 'ACR122U',
  })

  const { data: apiStatus } = useFetch<ReaderStatus>('/reader/status', {
    skip: false,
  })

  useEffect(() => {
    if (apiStatus) {
      setStatus(apiStatus)
    }

    // Poll reader status every 5 seconds
    const interval = setInterval(() => {
      // In a real app, this would call the API endpoint
      // For now, simulating the status check
    }, 5000)

    return () => clearInterval(interval)
  }, [apiStatus])

  return status
}

export function useReaderDetection() {
  const [detected, setDetected] = useState(false)
  const [isChecking, setIsChecking] = useState(false)

  const checkBadge = async () => {
    setIsChecking(true)
    try {
      // Call API to detect badge
      // const response = await fetch(...)
      // setDetected(response.data.detected)
      
      // For simulation: randomly detect badge after 2 seconds
      await new Promise(resolve => setTimeout(resolve, 2000))
      setDetected(Math.random() > 0.3)
    } catch (error) {
      console.error('Badge detection error:', error)
    } finally {
      setIsChecking(false)
    }
  }

  return { detected, isChecking, checkBadge }
}
