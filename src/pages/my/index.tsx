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
        <ul>
          <li>
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
                    subTitle="장바구니를 확인하고 구매할 상품을 선택하세요."
                  />
                }
                withArrow={true}
              />
            </Link>
          </li>
        </ul>
      </div>
    </Flex>
  )
}

const likeContainer = css`
  width: 500px;
`

export default MyPage
