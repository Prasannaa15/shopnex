'use client'

import { useSelector, useDispatch } from 'react-redux'
import { removeItem, clearCart, updateQuantity } from './redux/cartSlice'
import { useState, useEffect } from 'react'
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price)
}
export default function Cart() {
  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])
  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId))
  }
  const handleClearCart = () => {
    dispatch(clearCart())
  }
  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ itemId, quantity: newQuantity }))
    }
  }
  const deliveryCharges = cart.total > 999 ? 0 : 99
  const finalTotal = cart.total + deliveryCharges
  if (!isMounted) {
    return (
      <div>
        <h1>Shopping Cart</h1>
        <div style={{ textAlign: 'center', padding: '4rem', background: 'white', borderRadius: '8px' }}>
          <h2>Loading cart...</h2>
        </div>
      </div>
    )
  }

  if (cart.items.length === 0) {
    return (
      <div>
        <h1>Shopping Cart</h1>
        <div style={{ textAlign: 'center', padding: '4rem', background: 'white', borderRadius: '8px' }}>
          <h2>Your cart is empty</h2>
          <p>Browse our products and add some items to your cart!</p>
          <a href="/" className="btn btn-primary" style={{ width: 'auto', display: 'inline-block', marginTop: '1rem' }}>
            Continue Shopping
          </a>
        </div>
      </div>
    )
  }
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Shopping Cart ({cart.items.length} items)</h1>
        <button className="btn btn-danger" onClick={handleClearCart} style={{ width: 'auto' }}>
          Clear Cart
        </button>
      </div>

      <div>
        {cart.items.map(item => (
          <div key={item.id} className="cart-item">
            <div style={{ flex: 1 }}>
              <h3>{item.name}</h3>
              <p>{formatPrice(item.price)} each</p>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button 
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  style={{ padding: '0.5rem', background: '#e74c3c',color: 'white', border: 'none', borderRadius: '4px',cursor: 'pointer',width: '35px',height: '35px'
                  }}>
                  -
                </button>
                <span style={{ padding: '0 1rem', minWidth: '60px', textAlign: 'center' }}>
                  Qty: {item.quantity}
                </span>
                <button 
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  style={{padding: '0.5rem',background: '#2ecc71', color: 'white', border: 'none',borderRadius: '4px',cursor: 'pointer',width: '35px',height: '35px'
                  }}>
                  +
                </button>
              </div>
              
              <div style={{ minWidth: '120px', textAlign: 'center' }}>
                <strong>{formatPrice(item.price * item.quantity)}</strong>
              </div>
              
              <button 
                className="btn btn-danger" 
                onClick={() => handleRemoveItem(item.id)}
                style={{ width: 'auto' }} >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginTop: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span>Subtotal:</span>
          <span>{formatPrice(cart.total)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span>Delivery Charges:</span>
          <span>
            {deliveryCharges === 0 ? (
              <span style={{ color: '#2ecc71' }}>FREE</span>
            ) : (
              formatPrice(deliveryCharges)
            )}
          </span>
        </div>
        {cart.total > 0 && cart.total <= 999 && (
          <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
            * Free delivery on orders above ₹999
          </div>
        )}
        <hr style={{ margin: '1rem 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', fontWeight: 'bold' }}>
          <span>Total Amount:</span>
          <span>{formatPrice(finalTotal)}</span>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button className="btn btn-primary" style={{ width: 'auto', padding: '1rem 3rem', fontSize: '1.1rem' }}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  )
}