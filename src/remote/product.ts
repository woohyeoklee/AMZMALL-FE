import { COLLECTIONS } from '@/constants'
import { Product } from '@/models/product'
import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  limit,
  query,
  QuerySnapshot,
  startAfter,
  where,
} from 'firebase/firestore'
import { store } from './firebase'

export async function getProducts(pageParam?: QuerySnapshot<Product>) {
  const ShoesQuery =
    pageParam == null
      ? query(collection(store, COLLECTIONS.PRODUCT), limit(10))
      : query(
          collection(store, COLLECTIONS.PRODUCT),
          startAfter(pageParam),
          limit(10),
        )

  const ShoesSnapshot = await getDocs(ShoesQuery)

  const lastVisible = ShoesSnapshot.docs[ShoesSnapshot.docs.length - 1]

  const items = ShoesSnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as Product,
  )

  return { items, lastVisible }
}

export async function getProduct(id: string) {
  const snapshot = await getDoc(doc(store, COLLECTIONS.PRODUCT, id))

  return {
    id,
    ...snapshot.data(),
  } as Product
}

export async function getRecommendProducts(productIds: string[]) {
  const recommendQuery = query(
    collection(store, COLLECTIONS.PRODUCT),
    where(documentId(), 'in', productIds),
  )
  const snapshot = await getDocs(recommendQuery)

  return snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as Product,
  )
}
