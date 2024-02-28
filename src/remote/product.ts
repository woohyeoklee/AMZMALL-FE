import { COLLECTIONS } from '@/constants'
import { Product } from '@/models/product'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  QuerySnapshot,
  startAfter,
} from 'firebase/firestore'
import { store } from './firebase'

export async function getProducts(pageParam?: QuerySnapshot<Product>) {
  const productQuery =
    pageParam == null
      ? query(collection(store, COLLECTIONS.PRODUCT), limit(10))
      : query(
          collection(store, COLLECTIONS.PRODUCT),
          startAfter(pageParam),
          limit(5),
        )
  const productSnapshot = await getDocs(productQuery)

  const lastVisible = productSnapshot.docs[productSnapshot.docs.length - 1]

  const items = productSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Product),
  }))

  return { items, lastVisible }
}

export async function getProduct(id: string) {
  const snapshot = await getDoc(doc(store, COLLECTIONS.PRODUCT, id))

  return {
    id,
    ...(snapshot.data() as Product),
  }
}
