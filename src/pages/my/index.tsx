import { signOut } from 'firebase/auth'
import { useCallback } from 'react'

import Button from '@shared/Button'
import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'

import { auth } from '@remote/firebase'

function MyPage() {
  const handleLogout = useCallback(() => {
    signOut(auth)
  }, [])

  return (
    <Flex direction="column" align="center">
      <Spacing size={40} />

      <Spacing size={20} />

      <Button onClick={handleLogout}>로그아웃</Button>
    </Flex>
  )
}

export default MyPage
