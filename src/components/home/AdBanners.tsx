import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'

import { getAdbanner } from '@/remote/adbanner'
import Flex from '@components/shared/Flex'
import Text from '@components/shared/Text'
import { colors } from '@styles/colorPalette'
import { useQuery } from 'react-query'

import 'swiper/css'

function AdBanners() {
  const { data } = useQuery(['adBanners'], () => getAdbanner())
  console.log('data', data)

  return (
    <Container>
      <Swiper spaceBetween={8} loop>
        {data?.map((banner) => {
          return (
            <SwiperSlide key={banner.id}>
              <Link to={banner.link}>
                <Flex direction="column" css={bannerContainerStyles}>
                  <Text bold>{banner.title}</Text>
                  <Text typography="t7">{banner.description}</Text>
                </Flex>
              </Link>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </Container>
  )
}

const Container = styled.div`
  padding: 24px;
`

const bannerContainerStyles = css`
  padding: 16px;
  background-color: ${colors.grey};
  border-radius: 4px;
`

export default AdBanners
