import { User } from './user'

export interface Term {
  id: string
  link?: string
  title: string
}

export const DRAW_STATUS = {
  REDAY: 'REDAY',
  PROGRESS: 'PROGRESS',
  COMPLETE: 'COMPLETE',
  REJECT: 'REJECT',
} as const

export interface DrawValues {
  userId: User['uid']
  terms: Array<Term['id']>
  appliedAt: Date
  productId: string
  size: string
  delivery: string
  payment: string
  isDelivery: boolean
  isPayment: boolean
  status: keyof typeof DRAW_STATUS
  step: number
}

export interface Option {
  label: string
  value: string | number | undefined
}
