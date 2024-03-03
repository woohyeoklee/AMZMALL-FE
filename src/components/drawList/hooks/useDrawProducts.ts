import useUser from '@/hooks/auth/useUser'
import { getDrawedProducts } from '@/remote/draw'
import { useQuery } from 'react-query'

export default function useDrawProducts() {
  const user = useUser()
  const { data, isLoading } = useQuery(
    ['drawProducts', user?.uid],
    () => getDrawedProducts({ userId: user?.uid as string }),
    { enabled: user != null },
  )
  return { data, isLoading }
}
