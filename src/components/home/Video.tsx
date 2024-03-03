import { css } from '@emotion/react'

function Video() {
  return (
    <div css={videoContainer}>
      <video
        css={videoStyle}
        autoPlay={true}
        muted={true}
        loop={true}
        poster="/assets/poster.png"
      >
        <source src="/assets/nikevid.mp4" type="video/mp4"></source>
      </video>
    </div>
  )
}

const videoContainer = css`
  display: flex;
  justify-content: center; /* 가운데 정렬 */
`

const videoStyle = css`
  max-width: 100%;
`

export default Video
