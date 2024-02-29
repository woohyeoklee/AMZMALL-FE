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

  usePollStatus({
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
    return <FullPageLoader message='결제 진행중입니다.' />
  }

  return <Draw onSubmit={mutate} />
}

export default DrawPage
