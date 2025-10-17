'use client'

import { useSelector, useDispatch } from 'react-redux'
import { addItem } from './cart/redux/cartSlice'
import { useState, useEffect } from 'react'

const products = [
  { 
    id: 1, 
    name: 'Wireless Headphones', 
    price: 4999, 
    description: 'High-quality wireless headphones with noise cancellation',
    image: '/images/wireless headphone.webp'
  },
  { 
    id: 2, 
    name: 'Smart Watch', 
    price: 12999, 
    description: 'Feature-rich smartwatch with health monitoring',
    image: '/images/smartwatch.jpg'
  },
  { 
    id: 3, 
    name: 'Laptop Stand', 
    price: 2499, 
    description: 'Adjustable aluminum laptop stand',
    image: '/images/laptopstand.webp'
  },
  { 
    id: 4, 
    name: 'Mechanical Keyboard', 
    price: 3999, 
    description: 'RGB mechanical keyboard with blue switches',
    image: '/images/mechanicalkeyboard.jpg'
  },
  { 
    id: 5, 
    name: 'Gaming Mouse', 
    price: 2999, 
    description: 'Precision gaming mouse with customizable DPI',
    image: '/images/gamingmouse.webp'
  },
  { 
    id: 6, 
    name: 'USB-C Hub', 
    price: 1999, 
    description: '7-in-1 USB-C hub with 4K HDMI output',
    image: '/images/usb-c.jpeg'
  },
  { 
    id: 7, 
    name: 'Bluetooth Speaker', 
    price: 3499, 
    description: 'Portable Bluetooth speaker with 20W output',
    image: '/images/Bluetooth Speaker.jpeg'
  },
  { 
    id: 8, 
    name: 'Power Bank', 
    price: 1799, 
    description: '20000mAh fast charging power bank',
    image: '/images/Power Bank.webp'
  }
]
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price)
}
export default function Home() {
  const dispatch = useDispatch()
  const cartItems = useSelector(state => state.cart.items)
  const [isMounted, setIsMounted] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleAddToCart = (product) => {
    dispatch(addItem(product))
    setAlertMessage(`${product.name} added to cart!`)
    setShowAlert(true)
    setTimeout(() => setShowAlert(false), 3000)
  }

  const isInCart = (productId) => {
    return cartItems.some(item => item.id === productId)
  }
  if (!isMounted) {
    return (
      <div>
        <h1>Welcome to ShopNex India</h1>
        <p>Discover amazing products at great prices!</p>
        <div className="product-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">Loading...</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      {showAlert && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: '#4CAF50',
          color: 'white',
          padding: '1rem 2rem',
          borderRadius: '4px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          zIndex: 1000
        }}>
          {alertMessage}
        </div>
      )}

      <h1>Welcome to ShopNow India</h1>
      <p>Discover amazing products at great prices! 🇮🇳</p>
      
      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <img 
                src={product.image} 
                alt={product.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '4px'
                }}
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              <div 
                style={{
                  display: 'none',
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#ecf0f1',
                  color: '#7f8c8d',
                  borderRadius: '4px'
                }}
              >
                {product.name}
              </div>
            </div>
            <h3 className="product-name">{product.name}</h3>
            <p>{product.description}</p>
            <div className="product-price">{formatPrice(product.price)}</div>
            <button 
              className={`btn ${isInCart(product.id) ? 'btn-danger' : 'btn-primary'}`}
              onClick={() => handleAddToCart(product)}
            >
              {isInCart(product.id) ? 'Added to Cart ✓' : 'Add to Cart'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}