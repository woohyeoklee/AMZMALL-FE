import { useAlertContext } from '@/contexts/AlertContext'
import { DrawValues } from '@/models/draw'
import { drawProduct } from '@/remote/draw'
import { useMutation } from 'react-query'

interface useDrawProductMutationProps {
  onSuccess: () => void
  onError: () => void
}

function useDrawProductMutation({
  onSuccess,
  onError,
}: useDrawProductMutationProps) {
  const { open } = useAlertContext()

  return useMutation((drawValues: DrawValues) => drawProduct(drawValues), {
    onSuccess: () => {
      onSuccess()
    },
    onError: () => {
      open({
        title: '신청 실패',
        onButtonClick: () => {
          onError()
        },
      })
    },
  })
}

export default useDrawProductMutation
