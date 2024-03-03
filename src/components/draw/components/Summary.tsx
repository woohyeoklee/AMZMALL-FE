import Button from '@/components/shared/Button'
import Flex from '@/components/shared/Flex'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import { DrawValues } from '@/models/draw'
import { css } from '@emotion/react'
import { useNavigate } from 'react-router-dom'

function Summary({ drawedData }: { drawedData: DrawValues }) {
  const navigate = useNavigate()

  return (
    <div>
      <Spacing size={20} />
      <Flex direction="column" align="center">
        <img
          src="https://cdn2.iconfinder.com/data/icons/thesquid-ink-40-free-flat-icon-pack/64/nike-dunk-512.png"
          alt=""
          width={120}
          height={120}
        />
        <Spacing size={20} />
        <Text typography="t4" bold={true}>
          드로우 신청이 완료되었습니다.
        </Text>
      </Flex>
      <Spacing size={8} />
      <div style={{ padding: 24 }}>
        <Button.Group>
          <Button onClick={() => navigate('/')}>홈으로</Button>
          <Button onClick={() => navigate('/my/drawList')}>
            주문 내역 확인
          </Button>
        </Button.Group>
      </div>
      {/* 이미지 */}
      <Spacing size={16} />

      <ul css={listStyles}>
        <li>
          <Text color="black" typography="t5">
            배송 수단
          </Text>
          <Text typography="t6">
            {drawedData.isDelivery ? '택배 수령' : '직접 수령'}
          </Text>
        </li>
        <li>
          <Text color="black" typography="t5">
            결제 방법
          </Text>
          <Text typography="t6">
            {drawedData.isPayment ? '카카오페이' : '일반결제'}
          </Text>
        </li>
        <li>
          <Text color="black" typography="t5">
            이름
          </Text>
          <Text typography="t6">{drawedData.name}</Text>
        </li>
        <li>
          <Text color="black" typography="t5">
            배송지 주소
          </Text>
          <Text typography="t6">{drawedData.address}</Text>
        </li>
        <li>
          <Text color="black" typography="t5">
            전화번호
          </Text>
          <Text typography="t6">{drawedData.phone}</Text>
        </li>
        <li>
          <Text color="black" typography="t5">
            이메일
          </Text>
          <Text typography="t6">{drawedData.email}</Text>
        </li>
      </ul>

      <Spacing size={8} />
      <Spacing size={40} />
    </div>
  )
}

const imageStyles = css`
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
`

const listStyles = css`
  padding: 0;
  list-style-type: none;

  li:not(:last-child) {
    margin-bottom: 16px;
  }

  li {
    display: flex;
    justify-content: space-between;
    gap: 24px;
  }
`

export default Summary
