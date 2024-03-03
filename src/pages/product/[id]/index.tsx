import ActionButtons from '@/components/product/ActionButtons'
import Carousel from '@/components/product/Carousel'
import CountdownTimer from '@/components/product/CountdownTimer '
import ProductBenefitsList from '@/components/product/ProductBenefitsList'
import RecommendProducts from '@/components/product/RecommendProducts'
import Review from '@/components/product/Review'
import FixedBottomButton from '@/components/shared/FixedBottomButton'
import Flex from '@/components/shared/Flex'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import Top from '@/components/shared/Top'
import { useAlertContext } from '@/contexts/AlertContext'
import useUser from '@/hooks/auth/useUser'
import { getProduct } from '@/remote/product'
import addDelimiter from '@/utils/addDelimiter'
import { css } from '@emotion/react'
import { useCallback } from 'react'
import { useQuery } from 'react-query'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

function ProductDetailPage() {
  const location = useLocation()

  const { id = '' } = useParams()
  const navigate = useNavigate()
  const user = useUser()
  const { open } = useAlertContext()

  const { data } = useQuery(['product', id], () => getProduct(id), {
    enabled: id !== '',
  })

  const moveToDrawPage = useCallback(() => {
    if (user == null) {
      open({
        title: '로그인이 필요합니다',
        onButtonClick: () => {
          localStorage.setItem('redirectUrl', location.pathname)
          console.log('redirectUrl', location.pathname)
          navigate('/signin')
        },
      })
      return
    }
    navigate(`/draw/${id}`)
  }, [user, id, open, navigate, location.pathname])

  if (data == null) {
    return null
  }

  const { name, corpName, price, promotion, benefit, recommendProducts } = data
  console.log('data', promotion?.EndTime)

  return (
    <div>
      <Flex direction="column">
        <Top title={name} subTitle={corpName} />
        <Text typography="t2" bold css={priceContainerStyles}>
          {`${addDelimiter(price)}원`}
        </Text>
        <Spacing size={20} />
        <Carousel images={data.imageUrls} />
        <Spacing size={20} />
        <CountdownTimer promotionEndTime={promotion?.EndTime} />
        <ActionButtons product={data} />
        <ProductBenefitsList benefit={benefit} id={id} />
        <Spacing size={20} />
        {promotion != null ? (
          <Flex direction="column" css={termsContainerStyles}>
            <Text bold={true}>유의사항</Text>
            <Text typography="t7">{removeHtmlTags(promotion.terms)}</Text>
          </Flex>
        ) : null}
        <Review productId={id} />
        <RecommendProducts recommendProducts={recommendProducts} />
        <Spacing size={80} /> // 하단에 고정된 버튼을 위한 여백
        <FixedBottomButton
          label="제품 출시 전 미리 정보를 저장해 보세요!"
          onClick={moveToDrawPage}
        />
      </Flex>
    </div>
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
  margin-top: 20px;
  padding: 0 24px 0 24px;
`

export default ProductDetailPage
