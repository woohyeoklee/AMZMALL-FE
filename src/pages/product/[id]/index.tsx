import Carousel from '@/components/product/Carousel'
import FixedBottomButton from '@/components/shared/FixedBottomButton'
import Flex from '@/components/shared/Flex'
import ListRow from '@/components/shared/ListRow'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import Top from '@/components/shared/Top'
import { getProduct } from '@/remote/product'
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

function ProductDetailPage() {
  const { id = '' } = useParams()
  const { data } = useQuery(['product', id], () => getProduct(id), {
    enabled: id != '',
  })

  if (data == null) {
    return null
  }

  const { name, corpName, price, promotion, benefit } = data

  return (
    <div>
      <Flex direction="column">
        <Top title={name} subTitle={corpName} />
        <Text typography="t2" bold css={priceContainerStyles}>
          {price.toLocaleString()}원
        </Text>
        <Spacing size={20} />
        <Carousel images={data.imageUrls} />
        <Spacing size={20} />
        <ul>
          {benefit.map((text, idx) => {
            return (
              <motion.li
                initial={{
                  opacity: 0,
                  translateX: -90,
                }}
                whileInView={{
                  opacity: 1,
                  translateX: 0,
                }}
                transition={{
                  duration: 0.7,
                  ease: 'easeInOut',
                  delay: idx * 0.1,
                }}
              >
                <ListRow
                  as="div"
                  key={text}
                  left={<IconCheck />}
                  contents={
                    <ListRow.Texts
                      title={`응모 관련 ${idx + 1}`}
                      subTitle={text}
                    />
                  }
                />
              </motion.li>
            )
          })}
        </ul>
        <Spacing size={20} />
        {promotion != null ? (
          <Flex direction="column" css={termsContainerStyles}>
            <Text bold={true}>유의사항</Text>
            <Text typography="t7">{removeHtmlTags(promotion.terms)}</Text>
          </Flex>
        ) : null}
        <FixedBottomButton label="드로우 신청하기" />
      </Flex>
    </div>
  )
}

function IconCheck() {
  return (
    <img
      src="https://cdn2.iconfinder.com/data/icons/thesquid-ink-40-free-flat-icon-pack/64/nike-dunk-512.png"
      alt="check"
      width={24}
      height={24}
    />
  )
}

function removeHtmlTags(text: string) {
  return text.replace(/<\/?[^>]+(>|$)/g, '')
}

const priceContainerStyles = css`
  padding: 0 24px;
  text-align: right;
`

const termsContainerStyles = css`
  margin-top: 80px;
  padding: 0 24px 80px 24px;
`

export default ProductDetailPage
