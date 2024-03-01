import { User } from './user'

export interface Term {
  id: string
  link?: string
  title: string
}

export interface DrawValues {
  userId: User['uid']
  productId: string
  terms: Array<Term['id']> // 약관 정보인데, Id값라고 보면 됨
  appliedAt: Date
  size: string
  delivery: string // 아래 boolean 값으로 변경되서 삭제예정
  payment: string // 아래 boolean 값으로 변경되서 삭제예정
  isDelivery: boolean
  isPayment: boolean
  name?: string
  phone?: string
  email?: string
  address?: string
  status: keyof typeof DRAW_STATUS
  step: number
}

export const DRAW_STATUS = {
  REDAY: 'REDAY',
  PROGRESS: 'PROGRESS',
  COMPLETE: 'COMPLETE',
  REJECT: 'REJECT',
} as const

export interface Option {
  label: string
  value: string | number | undefined
}
