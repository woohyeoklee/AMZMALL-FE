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
  isDelivery: boolean // true: 배송 수령, false: 직접 수령
  isPayment: boolean // true: 카카오페이, false: 일반결제
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
