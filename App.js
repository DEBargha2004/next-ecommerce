'use client'

import { useEffect, useMemo, useState } from 'react'
import { GlobalAppState } from './context/Appstate'
import { collection, getDocs } from 'firebase/firestore'
import { useUser } from '@clerk/nextjs'
import { fireStoreDB } from './firebase.config'

function App ({ children }) {
  const [cart, setCart] = useState([])
  const [orders, setOrders] = useState([])
  const [itemsInfo, setItemsInfo] = useState([])

  const { user } = useUser()

  useEffect(() => {
    let fetchedItemsInfo = []
    Promise.all(
      orders.map(async order => {
        let response = await fetch(
          `https://fakestoreapi.com/products/${order.prod_id}`
        )
        response = await response.json()
        response.quantity = order.prod_quantity
        response.price = order.prod_price

        fetchedItemsInfo.push(response)
      })
    ).then(() => {
      setItemsInfo(fetchedItemsInfo)
    })
  }, [orders])

  useEffect(() => {
    if (!user?.id) return
    getDocs(collection(fireStoreDB, `users/${user.id}/cart`)).then(items => {
      const cart_cache = []
      items.docs?.forEach(item => {
        cart_cache.push(item.data())
      })
      setCart(cart_cache)
    })

    getDocs(collection(fireStoreDB, `users/${user.id}/orders`)).then(items => {
      const orders_cache = []
      items.docs?.forEach(item => {
        orders_cache.push(item.data())
      })
      setOrders(orders_cache)
    })
  }, [user])
  return (
    <GlobalAppState.Provider
      value={{ cart, setCart, orders, setOrders, itemsInfo, setItemsInfo }}
    >
      {children}
    </GlobalAppState.Provider>
  )
}

export default App
