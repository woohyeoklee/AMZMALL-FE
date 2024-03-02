import { COLLECTIONS } from '@/constants'
import { store } from '@/remote/firebase'
import { collection, getDocs, writeBatch } from 'firebase/firestore'
import Button from '../shared/Button'

function RecommendProductButton() {
  const handleButtonClick = async () => {
    const batch = writeBatch(store)
    const snapshot = await getDocs(collection(store, COLLECTIONS.PRODUCT))

    snapshot.docs.forEach((product) => {
      const 추천상품리스트 = []

      for (let doc of snapshot.docs) {
        if (추천상품리스트.length === 5) {
          break
        }

        if (doc.id !== product.id) {
          추천상품리스트.push(doc.id)
        }
      }

      batch.update(product.ref, { recommendProducts: 추천상품리스트 })
    })

    await batch.commit()
    alert('추천상품리스트가 업데이트 되었습니다')
  }
  return <Button onClick={handleButtonClick}>추천상품 데이터 추가</Button>
}

export default RecommendProductButton
