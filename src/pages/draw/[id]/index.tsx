import Draw from '@/components/draw'
import useDrawedProduct from '@/components/draw/hooks/useDrawedProduct'
import useDrawProductMutation from '@/components/draw/hooks/useDrawProductMutation'
import usePollStatus from '@/components/draw/hooks/usePollStatus'
import FullPageLoader from '@/components/shared/FullPageLoader'
import { useAlertContext } from '@/contexts/AlertContext'
import useUser from '@/hooks/auth/useUser'
import { DRAW_STATUS } from '@/models/draw'
import { updateDrawProduct } from '@/remote/draw'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const STATUS_MESSAGE = {
  [DRAW_STATUS.REDAY]: '결제 진행을 준비하고 있습니다.',
  [DRAW_STATUS.PROGRESS]: '결제가 진행중입니다. 잠시만 기다려주세요.',
  [DRAW_STATUS.COMPLETE]: '결제가 완료되었습니다.',
}

function DrawPage() {
  const navigate = useNavigate()
  const { open } = useAlertContext()

  const [readyToPoll, setReadyToPoll] = useState(false)
  const user = useUser()
  const { id } = useParams() as { id: string }

  const { data } = useDrawedProduct({
    userId: user?.uid as string,
    productId: id,
    options: {
      onSuccess: (drawed) => {
        if (drawed == null) {
          return
        }
        if (drawed.status === DRAW_STATUS.COMPLETE) {
          open({
            title: '이미 신청한 상품입니다.',
            onButtonClick: () => {
              window.history.back()
            },
          })
          return
        }
        setReadyToPoll(true)
      },
      onError: () => { },
      suspense: true,
    },
  })

  const { data: status } = usePollStatus({
    onSuccess: async () => {
      await updateDrawProduct({
        userId: user?.uid as string,
        productId: id,
        drawValues: {
          status: DRAW_STATUS.COMPLETE,
        },
      })
      navigate('/draw/done?success=true', { replace: true })
    },
    onError: async () => {
      await updateDrawProduct({
        userId: user?.uid as string,
        productId: id,
        drawValues: {
          status: DRAW_STATUS.REJECT,
        },
      })
      navigate('/draw/done?success=false', { replace: true })
    },
    enabled: readyToPoll,
  })

  const { mutate, isLoading: 드로우신청중인가 } = useDrawProductMutation({
    onSuccess: () => {
      setReadyToPoll(true)
    },
    onError: () => {
      window.history.back()
    },
  })
  if (data != null && data.status === DRAW_STATUS.COMPLETE) {
    return null
  }
  if (readyToPoll || 드로우신청중인가) {
    return <FullPageLoader message={STATUS_MESSAGE[status ?? 'REDAY']} />
  }

  return <Draw onSubmit={mutate} />
}

export default DrawPage
