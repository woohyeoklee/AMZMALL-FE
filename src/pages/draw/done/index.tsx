import { parse } from 'qs'

import FixedBottomButton from '@/components/shared/FixedBottomButton'
import Flex from '@/components/shared/Flex'
import Text from '@/components/shared/Text'

function DrawDonePage() {
  const { success } = parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as { success: string }

  return (
    <Flex>
      <Text>
        {success === 'true' ? '신청이 완료되었습니다.' : '신청에 실패했습니다.'}
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
