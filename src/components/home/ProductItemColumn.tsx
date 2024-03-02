import { Product } from '@/models/product'
import addDelimiter from '@/utils/addDelimiter'
import { css } from '@emotion/react'
import { MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import Flex from '../shared/Flex'
import ListColumn from '../shared/ListColumn'

function ProductItemColumn({
  product,
  isLike,
  onLike,
}: {
  product: Product
  isLike: boolean
  onLike: ({
    product,
  }: {
    product: Pick<Product, 'name' | 'id' | 'mainImageUrl' | 'price'>
  }) => void
}) {
  const handleLike = (e: MouseEvent<HTMLImageElement>) => {
    e.preventDefault()
    onLike({
      product: {
        name: product.name,
        mainImageUrl: product.mainImageUrl,
        id: product.id,
        price: product.price,
      },
    })
  }

  return (
    <Link to={`/product/${product.id}`}>
      <ListColumn
        top={
          <Flex
            direction="column"
            align="flex-end"
            style={{ position: 'relative' }}
          >
            <img
              src={
                isLike
                  ? 'https://cdn4.iconfinder.com/data/icons/twitter-29/512/166_Heart_Love_Like_Twitter-64.png'
                  : 'https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-heart-outline-64.png'
              }
              alt=""
              css={iconHeartStyles}
              onClick={handleLike}
            />
            <img
              src={product.mainImageUrl}
              alt="product"
              width="100%"
              height="100%"
            />
          </Flex>
        }
        contents={
          <ListColumn.Texts title={product.name} subTitle={product.corpName} />
        }
        bottom={`${addDelimiter(product.price)}원`}
      />
    </Link>
  )
}

const iconHeartStyles = css`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 30px;
  height: 30px;
`

export default ProductItemColumn
