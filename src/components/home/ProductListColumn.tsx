import useLike from '@/hooks/like/useLike'
import { css } from '@emotion/react'
import useProducts from '../product/hooks/useProducts'
import Flex from '../shared/Flex'
import ProductItemColumn from './ProductItemColumn'

function ProductListColumn() {
  const { data: products } = useProducts()
  const { data: likes, mutate: onLike } = useLike()

  if (products == null) {
    return null
  }

  return (
    <Flex css={productGrid}>
      {products.map((product) => (
        <div key={product.id} css={productItem}>
          <ProductItemColumn
            product={product}
            isLike={Boolean(
              likes?.find((like) => like.productId === product.id),
            )}
            onLike={onLike}
          />
        </div>
      ))}
    </Flex>
  )
}

const productGrid = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2열 그리드 */
  gap: 8px; /* 그리드 간격 */
`

const productItem = css`
  width: 100%; /* 상품 아이템의 너비를 100%로 설정하여 2열로 표시되도록 함 */
`

export default ProductListColumn
