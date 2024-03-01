import ProductInfo from '@/components/draw/ProductInfo'
import useUser from '@/hooks/auth/useUser'
import { DrawValues, DRAW_STATUS } from '@/models/draw'
import BasicInfo from '@components/draw/BasicInfo'
import Terms from '@components/draw/Terms'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProgressBar from '../shared/ProgressBar'

function Draw({ onSubmit }: { onSubmit: (drawValues: DrawValues) => void }) {
  const user = useUser()
  const { id } = useParams() as { id: string }

  const storageKey = `draw-${user?.uid}-${id}`

  const [drawValues, setDrawValues] = useState<Partial<DrawValues>>(() => {
    const drawed = localStorage.getItem(storageKey)
    if (drawed == null) {
      return {
        userId: user?.uid,
        productId: id,
        step: 0,
      }
    }
    return JSON.parse(drawed)
  })

  useEffect(() => {
    if (drawValues.step === 3) {
      localStorage.removeItem(storageKey)
      onSubmit({
        ...drawValues,
        appliedAt: new Date(),
        status: DRAW_STATUS.REDAY,
      } as DrawValues)
    } else {
      console.log('저장', drawValues)
      localStorage.setItem(storageKey, JSON.stringify(drawValues))
    }
  }, [drawValues, drawValues.step, onSubmit, storageKey])

  const handleTemsChange = (terms: DrawValues['terms']) => {
    console.log(terms)
    setDrawValues((prevValues) => ({
      ...prevValues,
      terms,
      step: (prevValues.step as number) + 1,
    }))
  }

  const handleBasicInfoChange = (
    infoValues: Pick<DrawValues, 'size' | 'delivery' | 'payment'>,
  ) => {
    setDrawValues((prevValues) => ({
      ...prevValues,
      ...infoValues,
      step: (prevValues.step as number) + 1,
    }))
  }

  const handleProductInfoChange = (
    ProductInfoValues: Pick<DrawValues, 'isDelivery' | 'isPayment'>,
  ) => {
    setDrawValues((prevValues) => ({
      ...prevValues,
      ...ProductInfoValues,
      step: (prevValues.step as number) + 1,
    }))
  }

  return (
    <div>
      <div>
        <ProgressBar progress={(drawValues.step as number) / 3} />
        {drawValues.step === 0 ? <Terms onNext={handleTemsChange} /> : null}
        {drawValues.step === 1 ? (
          <BasicInfo onNext={handleBasicInfoChange} />
        ) : null}
        {drawValues.step === 2 ? (
          <ProductInfo onNext={handleProductInfoChange} />
        ) : null}
      </div>
    </div>
  )
}

export default Draw
