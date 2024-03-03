import { DrawValues } from '@/models/draw'
import { useState } from 'react'
import FixedBottomButton from '../shared/FixedBottomButton'
import Spacing from '../shared/Spacing'
import Text from '../shared/Text'
import TextField from '../shared/TextField'

type ProductInfoValues = Pick<
  DrawValues,
  'name' | 'phone' | 'address' | 'email'
>

function ProductInfo({
  onNext,
}: {
  onNext: (ProductInfoValues: ProductInfoValues) => void
}) {
  const [productInfoValues, setProductInfoValues] = useState<ProductInfoValues>(
    {
      name: '',
      phone: '',
      address: '',
      email: '',
    },
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProductInfoValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onNext(productInfoValues)
  }

  return (
    <div style={{ padding: 24 }}>
      <Text bold={true}>예약정보</Text>
      <Spacing size={16} />
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={productInfoValues.name}
          onChange={handleChange}
          name="name"
        />
        <TextField
          label="Phone"
          value={productInfoValues.phone}
          onChange={handleChange}
          name="phone"
        />
        <TextField
          label="Address"
          value={productInfoValues.address}
          onChange={handleChange}
          name="address"
        />
        <TextField
          label="Email"
          value={productInfoValues.email}
          onChange={handleChange}
          name="email"
        />
      </form>
      <Spacing size={80} />

      <FixedBottomButton
        label="다음"
        onClick={() => onNext(productInfoValues)}
      />
    </div>
  )
}

export default ProductInfo
