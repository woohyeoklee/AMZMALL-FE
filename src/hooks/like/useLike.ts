import { useAlertContext } from '@/contexts/AlertContext'
import { Product } from '@/models/product'
import { getLikes, toggleLike } from '@/remote/like'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import useUser from '../auth/useUser'

function useLike() {
  const user = useUser()
  const { open } = useAlertContext()
  const navigate = useNavigate()
  const client = useQueryClient()

  const { data } = useQuery(
    ['like'],
    () => getLikes({ userId: user?.uid as string }),
    {
      enabled: user != null,
    },
  )

  const { mutate } = useMutation(
    ({
      product,
    }: {
      product: Pick<Product, 'name' | 'id' | 'mainImageUrl' | 'price'>
    }) => {
      if (user == null) {
        throw new Error('로그인이 필요합니다.')
      }

      return toggleLike({ product, userId: user.uid })
    },
    {
      onSuccess: () => {
        client.invalidateQueries('like')
        console.log('좋아요 토글 성공')
      },
      onError: (e: Error) => {
        if (e.message === '로그인 필요') {
          open({
            title: '로그인 후 이용해주세요',
            onButtonClick: () => {
              navigate('/signin')
            },
          })
          return
        }
        open({
          title: '알 수 없는 오류가 발생했습니다. 다시 시도해주세요.',
          onButtonClick: () => {
            console.error(e)
          },
        })
      },
    },
  )

  return { data, mutate }
}

export default useLike
