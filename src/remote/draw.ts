import { DrawValues } from '@/models/draw'
import { COLLECTIONS } from '@constants'
import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { store } from './firebase'

export async function drawProduct(drawValues: DrawValues) {
  return addDoc(collection(store, COLLECTIONS.PRODUCT_DRAW), drawValues)
}

export async function updateDrawProduct({
  productId,
  userId,
  drawValues,
}: {
  productId: string
  userId: string
  drawValues: Partial<DrawValues>
}) {
  const snapshot = await getDocs(
    query(
      collection(store, COLLECTIONS.PRODUCT_DRAW),
      where('productId', '==', productId),
      where('userId', '==', userId),
    ),
  )

  const [drawed] = snapshot.docs
  updateDoc(drawed.ref, drawValues)
}

export async function getDrawedProduct({
  userId,
  productId,
}: {
  userId: string
  productId: string
}) {
  const snapshot = await getDocs(
    query(
      collection(store, COLLECTIONS.PRODUCT_DRAW),
      where('productId', '==', productId),
      where('userId', '==', userId),
    ),
  )
  if (snapshot.docs.length === 0) {
    return null
  }
  const [drawed] = snapshot.docs

  return drawed.data() as DrawValues
}