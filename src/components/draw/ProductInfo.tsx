import { DrawValues } from '@/models/draw'
import { MouseEvent, useCallback, useState } from 'react'
import Button from '../shared/Button'
import FixedBottomButton from '../shared/FixedBottomButton'
import Spacing from '../shared/Spacing'

type ProductInfoValues = Pick<DrawValues, 'isDelivery' | 'isPayment'>

function ProductInfo({
  onNext,
}: {
  onNext: (ProductInfoValues: ProductInfoValues) => void
}) {
  const [productInfoValues, setProductInfoValues] = useState<ProductInfoValues>(
    {
      isDelivery: false,
      isPayment: false,
    },
  )

  const { isDelivery, isPayment } = productInfoValues

  const handleButtonClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const $button = e.target as HTMLButtonElement

    setProductInfoValues((prevValues) => ({
      ...prevValues,
      [$button.name]: JSON.parse($button.dataset.value as string),
    }))
  }, [])

  return (
    <div>
      <Button.Group title="배송 선택">
        <Button
          name="isDelivery"
          weak={isDelivery === false}
          size="medium"
          data-value={true}
          onClick={handleButtonClick}
        >
          직접 수령
        </Button>
        <Button
          name="isDelivery"
          weak={isDelivery === true}
          size="medium"
          data-value={false}
          onClick={handleButtonClick}
        >
          택배 수령
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
      <FixedBottomButton
        label="다음"
        onClick={() => onNext(productInfoValues)}
      />
    </div>
  )
}

export default ProductInfo
