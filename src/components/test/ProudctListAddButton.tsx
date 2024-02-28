import Button from '@shared/Button'
import { collection, doc, writeBatch } from 'firebase/firestore'

import { COLLECTIONS } from '@/constants'
import { product_list } from '@/mock/data'
import { store } from '@remote/firebase'

function ProudctListAddButton() {
  const handleButtonClick = async () => {
    const batch = writeBatch(store)
    product_list.forEach((prouct) => {
      const docRef = doc(collection(store, COLLECTIONS.PRODUCT))
      batch.set(docRef, prouct)
    })

    await batch.commit()
    alert('상품 리스트 추가가 완료되었습니다.')
  }
  return <Button onClick={handleButtonClick}>상품 리스트 추가하기</Button>
}

export default ProudctListAddButton
