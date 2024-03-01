import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate } from 'react-router-dom'
import useProducts from '../productList/hooks/useProducts'
import Badge from '../shared/Badge'
import ListRow from '../shared/ListRow'

function ProductListRow() {
  // const {
  //   data,
  //   hasNextPage = false,
  //   fetchNextPage,
  //   isFetching,
  // } = useInfiniteQuery(
  //   ['products'],
  //   ({ pageParam }) => {
  //     return getProducts(pageParam)
  //   },
  //   {
  //     getNextPageParam: (snapshot) => {
  //       return snapshot.lastVisible
  //     },
  //     suspense: true,
  //   },
  // )
  const navigate = useNavigate()

  // const loadMore = useCallback(() => {
  //   if (hasNextPage === false || isFetching) {
  //     return
  //   }

  //   fetchNextPage()
  // }, [fetchNextPage, hasNextPage, isFetching])

  const { data: products, hasNextPage, loadMore } = useProducts()

  if (products == null) {
    return null
  }

  // const products = flatten(data?.pages.map(({ items }) => items))

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
                  <ListRow.Texts
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

export default ProductListRow
