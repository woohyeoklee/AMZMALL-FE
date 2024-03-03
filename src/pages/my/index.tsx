import { signOut } from 'firebase/auth'
import { useCallback } from 'react'

import Button from '@shared/Button'
import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'

import MyImage from '@/components/my/MyImage'
import ListRow from '@/components/shared/ListRow'
import Text from '@/components/shared/Text'
import useUser from '@/hooks/auth/useUser'
import { css } from '@emotion/react'
import { auth } from '@remote/firebase'
import { Link } from 'react-router-dom'

function MyPage() {
  const user = useUser()

  const handleLogout = useCallback(() => {
    signOut(auth)
  }, [])

  return (
    <Flex direction="column" align="center">
      <Spacing size={40} />
      <MyImage size={80} mode="upload" />

      <Spacing size={20} />
      <Text bold={true}>{user?.displayName}</Text>

      <Spacing size={20} />
      <Button onClick={handleLogout}>로그아웃</Button>

      <Spacing size={80} />
      <div css={likeContainer}>
        <ul css={likeStyle}>
          <Link to="/my/like">
            <ListRow
              left={
                <img
                  src="https://cdn4.iconfinder.com/data/icons/business-and-finance-colorful-free-hand-drawn-set/100/shopping_cart-256.png"
                  alt="장바구니"
                  width="40px"
                  height="40px"
                />
              }
              contents={
                <ListRow.Texts
                  title="장바구니"
                  subTitle="장바구니 목록을 확인하세요."
                />
              }
              withArrow={true}
            />
          </Link>
          <Link to="/my/drawList">
            <ListRow
              left={
                <img
                  src="https://cdn4.iconfinder.com/data/icons/delivery-121/62/order-processing-shopping-buy-confirm-256.png"
                  alt="구매내역"
                  width="40px"
                  height="40px"
                />
              }
              contents={
                <ListRow.Texts
                  title="구매내역"
                  subTitle="구매한 상품 내역을 확인하세요."
                />
              }
              withArrow={true}
            />
          </Link>
        </ul>
      </div>
    </Flex>
  )
}

const likeContainer = css`
  display: flex;
  gap: 20px;
`

const likeStyle = css`
  max-width: 100%;
`

export default MyPage
