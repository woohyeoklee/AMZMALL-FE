import { css } from '@emotion/react'
import { useNavigate } from 'react-router-dom'
import useProducts from '../productList/hooks/useProducts'
import Flex from '../shared/Flex'
import ListColumn from '../shared/ListColumn'

function ProductListColumn() {
  const navigate = useNavigate()
  const { data: products } = useProducts()

  if (products == null) {
    return null
  }

  return (
    <Flex css={productGrid}>
      {products.map((product) => (
        <div key={product.id} css={productItem}>
          <ListColumn
            top={
              <img
                src={product.imageUrls[0]}
                alt="product"
                width={250}
                height={250}
              />
            }
            contents={
              <ListColumn.Texts
                title={product.name}
                subTitle={product.corpName}
              />
            }
            bottom={product.price.toLocaleString() + '원'}
            onClick={() => {
              navigate(`/product/${product.id}`)
            }}
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
