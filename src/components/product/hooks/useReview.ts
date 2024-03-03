import useUser from '@/hooks/auth/useUser'
import { getReviews, removeReview, writeReview } from '@/remote/review'
import { useMutation, useQuery, useQueryClient } from 'react-query'

function useReview({ productId }: { productId: string }) {
  const user = useUser()
  const client = useQueryClient()

  const { data, isLoading } = useQuery(['reviews', productId], () =>
    getReviews({ productId }),
  )
  const { mutateAsync: write } = useMutation(
    async (text: string) => {
      const newReview = {
        createdAt: new Date(),
        productId,
        userId: user?.uid as string,
        text,
      }
      await writeReview(newReview)
      return true
    },
    {
      onSuccess: () => {
        client.invalidateQueries(['reviews', productId])
      },
    },
  )
  const { mutate: remove } = useMutation(
    ({ reviewId, productId }: { reviewId: string; productId: string }) => {
      return removeReview({ reviewId, productId })
    },
    {
      onSuccess: () => {
        client.invalidateQueries(['reviews', productId])
      },
    },
  )

  return { data, isLoading, write, remove }
}

export default useReview
