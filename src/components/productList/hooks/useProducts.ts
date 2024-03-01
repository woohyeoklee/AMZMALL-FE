import { getProducts } from '@/remote/product'
import { flatten } from 'lodash'
import { useCallback } from 'react'
import { useInfiniteQuery } from 'react-query'

function useProducts() {
  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery(
    ['products'],
    ({ pageParam }) => {
      return getProducts(pageParam)
    },
    {
      getNextPageParam: (snapshot) => {
        return snapshot.lastVisible
      },
      suspense: true,
    },
  )
  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return
    }

    fetchNextPage()
  }, [fetchNextPage, hasNextPage, isFetching])

  const products = flatten(data?.pages.map(({ items }) => items))

  return { data: products, loadMore, hasNextPage, isFetching }
}

export default useProducts
