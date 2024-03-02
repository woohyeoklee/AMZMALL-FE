import addDelimiter from '@/utils/addDelimiter'
import ListRow from '@shared/ListRow'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'
import { useState } from 'react'
import Button from '../shared/Button'
import useRecommendProducts from './hooks/useRecommendProducts'

function RecommendProducts({
  recommendProducts,
}: {
  recommendProducts: string[]
}) {
  const { data, isLoading } = useRecommendProducts({
    productIds: recommendProducts,
  })
  const [showMore, setShowMore] = useState(false)

  if (data == null || isLoading) {
    return null
  }

  const 상품리스트 = data.length < 3 || showMore ? data : data.slice(0, 3)

  return (
    <div style={{ margin: '24px 0' }}>
      <Text bold={true} typography="t4" style={{ padding: '0 24px' }}>
        Recommend Products
      </Text>
      <Spacing size={16} />
      <ul>
        {상품리스트.map((product) => (
          <ListRow
            key={product.id}
            left={
              <img
                src={product.imageUrls[0]}
                alt={product.name}
                style={{ width: 80, height: 80 }}
              />
            }
            contents={
              <ListRow.Texts
                title={product.name}
                subTitle={`${addDelimiter(product.price)}원`}
              />
            }
          />
        ))}
      </ul>
      {data.length > 3 && showMore === false ? (
        <div style={{ padding: '0 24px', marginTop: '16px' }}>
          <Button
            full={true}
            weak={true}
            onClick={() => {
              setShowMore(true)
            }}
          >
            추천상품 더보기
          </Button>
        </div>
      ) : null}
    </div>
  )
}

export default RecommendProducts
