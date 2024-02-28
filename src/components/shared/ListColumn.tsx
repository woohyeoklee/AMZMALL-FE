import { css } from '@emotion/react';
import Flex from './Flex';
import Text from './Text';

interface ListColumnProps {
  top?: React.ReactNode;
  contents: React.ReactNode;
  bottom?: React.ReactNode;
  onClick?: () => void;
  as?: 'div' | 'article';
}

function ListColumn({
  as = 'div',
  top,
  contents,
  bottom,
  onClick,
}: ListColumnProps) {
  return (
    <Flex as={as} css={listColumnContainerStyles} onClick={onClick} align="center">
      <Flex css={listColumnTopStyles}>{top}</Flex>
      <Flex css={listColumnContentsStyles}>{contents}</Flex>
      <Flex>{bottom}</Flex>
    </Flex>
  );
}

const listColumnContainerStyles = css`
  padding: 8px 24px;
`

const listColumnTopStyles = css`
  margin-bottom: 14px;
`

const listColumnContentsStyles = css`
  flex: 1;
`


function ListColumnTexts({
  title,
  subTitle,
}: {
  title: React.ReactNode
  subTitle: React.ReactNode
}) {
  return (
    <Flex direction="column">
      <Text bold={true}>{title}</Text>
      <Text typography="t7">{subTitle}</Text>
    </Flex>
  )
}

ListColumn.Texts = ListColumnTexts

export default ListColumn
