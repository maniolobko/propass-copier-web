export type Page = 'home' | 'copy'

export interface User {
  name: string
  role: 'Admin' | 'Client' | 'Viewer'
  email: string
  avatar?: string
}

export interface ReaderStatus {
  isConnected: boolean
  model: string
  status: string
}

export interface QuotaInfo {
  used: number
  total: number
  remaining: number
}

export interface Statistic {
  label: string
  value: number
  icon: string
}
