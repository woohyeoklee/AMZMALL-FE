import { css } from '@emotion/react'
import { ReactNode } from 'react'
import Text from '../shared/Text'
import Flex from './Flex'

interface ListColumnProps {
  top?: ReactNode
  contents: ReactNode
  bottom?: ReactNode
  onClick?: () => void
  as?: 'div' | 'article'
}

function ListColumn({
  as = 'div',
  top,
  contents,
  bottom,
  onClick,
}: ListColumnProps) {
  return (
    <Flex
      as={as}
      direction="column"
      css={listColumnContainer}
      onClick={onClick}
    >
      {top && <div css={topStyles}>{top}</div>}
      <div css={contentsStyles}>{contents}</div>
      {bottom && <div css={bottomStyles}>{bottom}</div>}
    </Flex>
  )
}

const listColumnContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const topStyles = css`
  margin-bottom: 5px;
`

const contentsStyles = css`
  flex: 1;
  margin-bottom: 8px;
`

const bottomStyles = css`
  margin-bottom: 5px;
`

function ListColumnTexts({
  title,
  subTitle,
}: {
  title: React.ReactNode
  subTitle: React.ReactNode
}) {
  return (
    <div css={textsContainer}>
      <Text typography="t7">{subTitle}</Text>
      <Text typography="t5" bold>
        {title}
      </Text>
    </div>
  )
}

const textsContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

ListColumn.Texts = ListColumnTexts

export default ListColumn
