import { css } from '@emotion/react'

export const colorPalette = css`
  :root {
    --red: #f44336;
    --orange: #ff9800;
    --green: #4caf50;
    --white: #fff;
    --black: #212121;
    --grey: #f0efef;
  }
`

export const colors = {
  red: 'var(--red)',
  orange: 'var(--orange)',
  green: 'var(--green)',
  white: 'var(--white)',
  black: 'var(--black)',
  grey: 'var(--grey)',
}

export type Colors = keyof typeof colors
