import { getDoc, doc, setDoc, updateDoc, increment } from 'firebase/firestore'
import { fireStoreDB } from '@/firebase.config'

export const updateCartInFirebase = async ({ product, userId, quantity }) => {
  const productInfo = await getDoc(
    doc(fireStoreDB, `users/${userId}/cart/${product.id}`)
  )
  if (productInfo.exists()) {
    updateDoc(doc(fireStoreDB, `users/${userId}/cart/${product.id}`), {
      quantity: increment(quantity || 1)
    })
  } else {
    setDoc(doc(fireStoreDB, `users/${userId}/cart/${product.id}`), {
      ...product,
      quantity: quantity || 1
    })
  }
}
