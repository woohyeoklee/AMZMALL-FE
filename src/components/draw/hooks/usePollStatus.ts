import { DRAW_STATUS } from '@/models/draw'
import { useQuery } from 'react-query'

interface usePollStatusProps {
  onSuccess: () => void
  onError: () => void
  enabled: boolean
}

function usePollStatus({ enabled, onSuccess, onError }: usePollStatusProps) {
  return useQuery(['pollStatus'], () => getPaymentStatus(), {
    enabled,
    refetchInterval: 2000,
    staleTime: 0,
    onSuccess: (status) => {
      if (status === DRAW_STATUS.COMPLETE) {
        onSuccess()
      }
    },
    onError: () => {
      onError()
    },
  })
}

function getPaymentStatus() {
  const values = [
    DRAW_STATUS.REDAY,
    DRAW_STATUS.PROGRESS,
    DRAW_STATUS.COMPLETE,
    DRAW_STATUS.REJECT,
  ]

  const status = values[Math.floor(Math.random() * values.length)]

  if (status === DRAW_STATUS.REJECT) {
    throw new Error('Payment failed')
  }
  return status
}

export default usePollStatus
