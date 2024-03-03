import Select from './components/Select'

import { DrawValues } from '@/models/draw'
import { 사이즈옵션 } from '@constants/draw'
import { ChangeEvent, MouseEvent, useCallback, useState } from 'react'
import Button from '../shared/Button'
import FixedBottomButton from '../shared/FixedBottomButton'
import Spacing from '../shared/Spacing'

type InfoValues = Pick<DrawValues, 'size' | 'isDelivery' | 'isPayment'>

function BasicInfo({ onNext }: { onNext: (infoValues: InfoValues) => void }) {
  const [infoValues, setInfoValues] = useState<InfoValues>({
    size: '',
    isDelivery: false,
    isPayment: false,
  })
  const { isDelivery, isPayment } = infoValues

  const handleInfoChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setInfoValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }))
  }, [])

  const handleButtonClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const $button = e.target as HTMLButtonElement

    setInfoValues((prevValues) => ({
      ...prevValues,
      [$button.name]: JSON.parse($button.dataset.value as string),
    }))
  }, [])

  return (
    <div>
      <Select
        name="size"
        label="사이즈"
        options={사이즈옵션}
        placeholder={'사이즈를 선택해주세요'}
        value={infoValues.size}
        onChange={handleInfoChange}
      />
      <div>
        <Button.Group title="배송 선택">
          <Button
            name="isDelivery"
            weak={isDelivery === false}
            size="medium"
            data-value={true}
            onClick={handleButtonClick}
          >
            택배 수령
          </Button>
          <Button
            name="isDelivery"
            weak={isDelivery === true}
            size="medium"
            data-value={false}
            onClick={handleButtonClick}
          >
            직접 수령
          </Button>
        </Button.Group>
        <Spacing size={10} />
        <Button.Group title="결제 선택">
          <Button
            name="isPayment"
            weak={isPayment === true}
            size="medium"
            data-value={false}
            onClick={handleButtonClick}
          >
            일반결제
          </Button>
          <Button
            name="isPayment"
            weak={isPayment === false}
            size="medium"
            data-value={true}
            onClick={handleButtonClick}
          >
            카카오페이
          </Button>
        </Button.Group>
      </div>
      <FixedBottomButton
        label="다음"
        onClick={() => {
          onNext(infoValues)
        }}
      />
    </div>
  )
}

export default BasicInfo
