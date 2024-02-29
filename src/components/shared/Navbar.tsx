import { css } from '@emotion/react'
import { colors } from '@styles/colorPalette'

import useUser from '@/hooks/auth/useUser'
import Flex from '@shared/Flex'
import { useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import MyImage from '../my/MyImage'
import Button from './Button'
import Text from './Text'

function Navbar() {
  const location = useLocation()
  const showSignButton =
    ['/signup', '/signin'].includes(location.pathname) === false

  const user = useUser()

  const renderButton = useCallback(() => {
    if (user != null) {
      return (
        <Link to="/my">
          <MyImage size={40} />
        </Link>
      )
    }
    if (showSignButton) {
      return (
        <Link to="/signin">
          <Button>회원가입/로그인</Button>
        </Link>
      )
    }

    return null
  }, [user, showSignButton])

  return (
    <Flex justify="space-between" align="center" css={navbarContainerStyles}>
      <Link to="/">
        <Text bold={true} typography="t3">
          AMZDRAW
        </Text>
      </Link>
      {renderButton()}
    </Flex>
  )
}

const navbarContainerStyles = css`
  padding: 10px 24px;
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  z-index: 10;
  border-bottom: 1px solid ${colors.grey};
`

export default Navbar
