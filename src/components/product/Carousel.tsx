import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'

function Carousel({ images }: { images: string[] }) {
  return (
    <div>
      <Swiper spaceBetween={8} loop>
        {images.map((imageUrl, idx) => (
          <SwiperSlide key={imageUrl}>
            <img
              src={imageUrl}
              alt={`${idx + 1}번째 이미지`}
              width={500}
              height={500}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Carousel
