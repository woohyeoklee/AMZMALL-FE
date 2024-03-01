import formatTime from '@/utils/formatTime'
import { css } from '@emotion/react'
import { differenceInMilliseconds, parseISO } from 'date-fns'
import { useEffect, useState } from 'react'

const CountdownTimer = ({
  promotionEndTime,
}: {
  promotionEndTime: string | undefined
}) => {
  // const promotionEndTime = '2024-04-02T00:00:00+09:00'
  const [timeRemaining, setTimeRemaining] = useState(0)

  useEffect(() => {
    if (promotionEndTime == null) {
      return
    }

    const timer = setInterval(() => {
      const remaining = differenceInMilliseconds(
        parseISO(promotionEndTime),
        new Date(),
      )

      if (remaining <= 0) {
        clearInterval(timer)
        setTimeRemaining(0)
      } else {
        setTimeRemaining(remaining)
      }
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [promotionEndTime])

  if (timeRemaining === null) {
    return null
  }

  const promotionTxt =
    timeRemaining > 0 ? `${formatTime(timeRemaining)}` : '프로모션 종료'

  return <div css={timerContainer}>{promotionTxt}</div>
}

const timerContainer = css`
  font-size: 36px;
  font-weight: bold;
  margin: 16px auto;
`

export default CountdownTimer
