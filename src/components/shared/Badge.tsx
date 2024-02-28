import styled from '@emotion/styled'

import Text from '@shared/Text'
import { colors } from '@styles/colorPalette'

interface BadgeProps {
  label: string
}

function Badge({ label }: BadgeProps) {
  return (
    <Container>
      <Text bold={true} typography="t7" color="white">
        {label}
      </Text>
    </Container>
  )
}

const Container = styled.div`
  border-radius: 12px;
  background-color: ${colors.orange};
  padding: 2px 8px;
`

export default Badge
