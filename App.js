'use client'

import { useEffect, useState } from 'react'
import { GlobalAppState } from './context/Appstate'
import { collection, getDocs } from 'firebase/firestore'
import { useUser } from '@clerk/nextjs'
import { fireStoreDB } from './firebase.config'

function App ({ children }) {
  const [cart, setCart] = useState([])
  const { user, isLoaded } = useUser()

  useEffect(() => {
    if (!isLoaded) return
    getDocs(collection(fireStoreDB, `users/${user.id}/cart`)).then(items => {
      const cart_cache = []
      items.docs?.forEach(item => {
        cart_cache.push(item.data())
      })
      setCart(cart_cache)
    })
  }, [isLoaded])
  return (
    <GlobalAppState.Provider value={{ cart, setCart }}>
      {children}
    </GlobalAppState.Provider>
  )
}

export default App
