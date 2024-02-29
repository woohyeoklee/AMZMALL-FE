import { DrawValues } from '@/models/draw'
import { getDrawedProduct } from '@/remote/draw'
import { useQuery, UseQueryOptions } from 'react-query'

function useDrawedProduct({
  userId,
  productId,
  options,
}: {
  userId: string
  productId: string
  options?: Pick<
    UseQueryOptions<DrawValues | null>,
    'onSuccess' | 'onError' | 'suspense'
  >
}) {
  return useQuery(
    ['drawed', userId, productId],
    () => getDrawedProduct({ userId, productId }),
    options,
  )
}

export default useDrawedProduct
