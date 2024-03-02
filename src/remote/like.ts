import { COLLECTIONS } from '@/constants'
import { Like } from '@/models/like'
import { Product } from '@/models/product'
import { store } from '@/remote/firebase'
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  where,
  writeBatch,
} from 'firebase/firestore'

export async function getLikes({ userId }: { userId: string }) {
  const snapshot = await getDocs(
    query(
      collection(store, COLLECTIONS.LIKE),
      where('userId', '==', userId),
      orderBy('order', 'asc'),
    ),
  )

  return snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as Like,
  )
}

export async function toggleLike({
  product,
  userId,
}: {
  product: Pick<Product, 'name' | 'id' | 'mainImageUrl' | 'price'>
  userId: string
}) {
  const findSnapshot = await getDocs(
    query(
      collection(store, COLLECTIONS.LIKE),
      where('userId', '==', userId),
      where('productId', '==', product.id),
    ),
  )
  // (장바구니) 존재 여부 확인 -> 있으면 삭제, 없으면 추가
  if (findSnapshot.docs.length > 0) {
    const removeTarget = findSnapshot.docs[0]
    const removeTargetOrder = findSnapshot.docs[0].data().order

    const updateTagetSnapshot = await getDocs(
      query(
        collection(store, COLLECTIONS.LIKE),
        where('userId', '==', userId),
        where('order', '>', removeTargetOrder),
      ),
    )

    if (updateTagetSnapshot.empty) {
      return deleteDoc(removeTarget.ref)
    } else {
      const batch = writeBatch(store)
      updateTagetSnapshot.forEach((doc) => {
        batch.update(doc.ref, { order: doc.data().order - 1 })
      })
      await batch.commit()
      return deleteDoc(removeTarget.ref)
    }
  } else {
    const lastCartSnapshot = await getDocs(
      query(
        collection(store, COLLECTIONS.LIKE),
        where('userId', '==', userId),
        orderBy('order', 'desc'),
        limit(1),
      ),
    )

    const lastOrder = lastCartSnapshot.empty
      ? 0
      : lastCartSnapshot.docs[0].data().order

    const newOrder = {
      order: lastOrder + 1,
      productId: product.id,
      productName: product.name,
      productImageUrl: product.mainImageUrl,
      productPrice: product.price,
      userId,
    }

    return setDoc(doc(collection(store, COLLECTIONS.LIKE)), newOrder)
  }
}

export function updateOrder(likes: Like[]) {
  const batch = writeBatch(store)

  likes.forEach((like) => {
    batch.update(doc(collection(store, COLLECTIONS.LIKE), like.id), {
      order: like.order,
    })
  })

  return batch.commit()
}
