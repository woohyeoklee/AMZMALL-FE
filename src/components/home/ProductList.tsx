import { getProducts } from '@/remote/product'
import { flatten } from 'lodash'

import ListColumn from '@shared/ListColumn'
import { useCallback } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useInfiniteQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import Badge from '../shared/Badge'
import ListRow from '../shared/ListRow'

function ProductList() {
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
  const navigate = useNavigate()

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return
    }

    fetchNextPage()
  }, [fetchNextPage, hasNextPage, isFetching])

  if (data == null) {
    return null
  }

  const products = flatten(data?.pages.map(({ items }) => items))

  return (
    <div>
      <InfiniteScroll
        dataLength={products.length}
        hasMore={hasNextPage}
        loader={<ListRow.Skeleton />}
        next={loadMore}
        scrollThreshold="100px"
      >
        <ul>
          {products.map((product) => {
            return (
              <ListRow
                key={product.id}
                left={
                  <img
                    src={product.imageUrls[0]}
                    alt="product"
                    width={80}
                    height={80}
                  />
                }
                contents={
                  <ListColumn.Texts
                    title={product.corpName}
                    subTitle={product.name}
                  />
                }
                right={
                  product.delivery != null ? (
                    <Badge label={product.delivery} />
                  ) : null
                }
                withArrow
                onClick={() => {
                  navigate(`/product/${product.id}`)
                }}
              />
            )
          })}
        </ul>
      </InfiniteScroll>
    </div>
  )
}

export default ProductList
