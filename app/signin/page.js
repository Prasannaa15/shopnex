'use client'

import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { login } from '../cart/redux/userSlice'
export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isMounted, setIsMounted] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email && password) {
      dispatch(login({ 
        name: 'John Doe', 
        email: email,
        id: '1'
      }))
      router.push('/')
    } else {
      alert('Please fill in all fields')
    }
  }
  if (!isMounted) {
    return (
      <div>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Sign In</h1>
        <div className="form-container">
          <div>Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Sign In</h1>
      
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              key="email-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              key="password-input"
            />
          </div>
          
          <button type="submit" className="btn btn-primary">
            Sign In
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          Don't have an account? <a href="/signup" style={{ color: '#3498db' }}>Sign up here</a>
        </p>
      </div>
    </div>
  )
}