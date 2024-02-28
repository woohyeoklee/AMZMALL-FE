import Button from '@shared/Button'
import { collection, doc, writeBatch } from 'firebase/firestore'

import { COLLECTIONS } from '@/constants'
import { adBanners } from '@/mock/data'
import { store } from '@remote/firebase'

function AdBannerAddButton() {
  const handleButtonClick = async () => {
    const batch = writeBatch(store)
    adBanners.forEach((adBanners) => {
      const docRef = doc(collection(store, COLLECTIONS.ADBANNER))
      batch.set(docRef, adBanners)
    })

    await batch.commit()
    alert('광고배너 추가가 완료되었습니다.')
  }
  return <Button onClick={handleButtonClick}>광고 배너 추가하기</Button>
}

export default AdBannerAddButton
