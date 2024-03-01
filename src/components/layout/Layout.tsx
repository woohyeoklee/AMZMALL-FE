import { css } from '@emotion/react'

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div css={layoutContainer}>{children}</div>
}

const layoutContainer = css`
  display: flex;
  flex-direction: column;
  max-width: 767px; /* 최대 너비 설정 */
  min-height: 100vh; /* 화면 높이 최소값 설정 */
  margin: 0 auto; /* 가운데 정렬 */
`
