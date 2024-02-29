import { css } from '@emotion/react'

import Flex from './Flex'
import Text from './Text'

interface TopProps {
  title: string
  subTitle: string
}

function Top({ title, subTitle }: TopProps) {
  return (
    <Flex direction="column" css={containerStyles}>
      <Text bold={true} typography="t1">
        {title}
      </Text>
      <Text typography="t4">{subTitle}</Text>
    </Flex>
  )
}

const containerStyles = css`
  padding: 10px 20px;
`

export default Top
