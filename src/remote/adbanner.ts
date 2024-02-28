import { COLLECTIONS } from '@/constants'
import { AdBanner } from '@/models/adbanner'
import { collection, getDocs } from 'firebase/firestore'
import { store } from './firebase'

export async function getAdbanner() {
  const adbannerSnapshot = await getDocs(
    collection(store, COLLECTIONS.ADBANNER),
  )

  return adbannerSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as AdBanner),
  }))
}
