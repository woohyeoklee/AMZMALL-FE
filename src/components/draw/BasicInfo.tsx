import Select from './components/Select'

import { DrawValues } from '@/models/draw'
import { 결제옵션, 배송옵션, 사이즈옵션 } from '@constants/draw'
import { ChangeEvent, useCallback, useState } from 'react'
import FixedBottomButton from '../shared/FixedBottomButton'

type InfoValues = Pick<DrawValues, 'size' | 'delivery' | 'payment'>

function BasicInfo({ onNext }: { onNext: (infoValues: InfoValues) => void }) {
  const [infoValues, setInfoValues] = useState<InfoValues>({
    size: '',
    delivery: '',
    payment: '',
  })

  const handleInfoChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setInfoValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }))
  }, [])

  const 모든정보가선택되었는가 = Object.values(infoValues).every(
    (value) => value,
  )

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
      <Select
        name="delivery"
        label="배송"
        options={배송옵션}
        placeholder={'배송을 선택해주세요'}
        value={infoValues.delivery}
        onChange={handleInfoChange}
      />
      <Select
        name="payment"
        label="결제"
        options={결제옵션}
        placeholder={'결제를 선택해주세요'}
        value={infoValues.payment}
        onChange={handleInfoChange}
      />
      <FixedBottomButton
        label="다음"
        onClick={() => {
          onNext(infoValues)
        }}
        disabled={모든정보가선택되었는가 === false}
      />
    </div>
  )
}

export default BasicInfo
