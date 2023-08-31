'use client'

import { useState } from 'react'
import { GlobalAppState } from './context/Appstate'

function App ({ children }) {
  const [cart, setCart] = useState([])
  return (
    <GlobalAppState.Provider value={{ cart, setCart }}>
      {children}
    </GlobalAppState.Provider>
  )
}

export default App
