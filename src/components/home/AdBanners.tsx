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
  const { data, isLoading, isError } = useQuery(['adBanners'], () =>
    getAdbanner(),
  )
  if (isLoading) {
    return (
      <Container>
        <Flex direction="column" css={bannerContainerStyles}>
          <Text bold={true}>&nbsp;</Text>
          <Text typography="t7">&nbsp;</Text>
        </Flex>
      </Container>
    )
  }

  if (isError || !data || data.length === 0) {
    return <div>Error occurred or no data available.</div>
  }

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
  padding: 16px 24px;
`

const bannerContainerStyles = css`
  padding: 16px;
  background-color: ${colors.grey};
  border-radius: 4px;
`

export default AdBanners
