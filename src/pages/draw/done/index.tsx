import { parse } from 'qs'

import Summary from '@/components/draw/components/Summary'
import useDrawedProduct from '@/components/draw/hooks/useDrawedProduct'
import FixedBottomButton from '@/components/shared/FixedBottomButton'
import Flex from '@/components/shared/Flex'
import Text from '@/components/shared/Text'

function DrawDonePage() {
  const { success, userId, productId } = parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as {
    success: string
    userId: string
    productId: string
  }
  const { data } = useDrawedProduct({
    userId: userId as string,
    productId: productId as string,
  })
  if (data == null) {
    return null
  }

  const drawedData = data
  console.log('productData', drawedData)

  return (
    <Flex direction="column" align="center">
      <Text>
        {success === 'true' ? (
          <Summary drawedData={drawedData} />
        ) : (
          '신청에 실패했습니다.'
        )}
      </Text>
      <FixedBottomButton
        label="확인"
        onClick={() => {
          window.history.back()
        }}
      />
    </Flex>
  )
}

export default DrawDonePage
