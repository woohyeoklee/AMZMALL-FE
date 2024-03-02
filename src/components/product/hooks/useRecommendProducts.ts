import { getRecommendProducts } from '@/remote/product'
import { useQuery } from 'react-query'

function useRecommendProducts({ productIds }: { productIds: string[] }) {
  return useQuery(
    ['recommendProducts', JSON.stringify(productIds)],
    () => getRecommendProducts(productIds),
    {
      // enabled: productIds.length > 0,
    },
  )
}

export default useRecommendProducts
