import { useState } from 'react'
import NavBar from './NavBar'
import ProductList from './ProductList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar />
      <ProductList />
    </>
  )
}

export default App
