import { updateCartInFirebase } from './updateCartInFirebase'
import { cloneDeep } from 'lodash'

export const addToCart = ({ setCart, count, userId, product }) => {
  setCart(prev => {
    prev = cloneDeep(prev)
    const item = prev.find(item => item.id === product.id)
    if (item) {
      item.quantity += count || 1
      updateCartInFirebase({ product, userId, quantity: count })
    } else {
      prev.push({ ...product, quantity: count || 1 })
      updateCartInFirebase({ product, userId, quantity: count })
    }

    return prev
  })
}
