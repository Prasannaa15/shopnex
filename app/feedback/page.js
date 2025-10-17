'use client'

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addFeedback, toggleShowFeedbacks, clearAllFeedbacks, deleteFeedback } from '../cart/redux/feedbackSlice'

export default function Feedback() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    message: '',
    category: 'general'
  })
  const [isMounted, setIsMounted] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const dispatch = useDispatch()
  const feedbackState = useSelector(state => state.feedback)
  useEffect(() => {
    setIsMounted(true)
  }, [])
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.name && formData.email && formData.message) {
      dispatch(addFeedback(formData))
      setIsSubmitted(true)
      setFormData({
        name: '',
        email: '',
        rating: 5,
        message: '',
        category: 'general'
      })
      
      setTimeout(() => setIsSubmitted(false), 3000)
    } else {
      alert('Please fill in all required fields')
    }
  }
  const handleToggleFeedbacks = () => {
    dispatch(toggleShowFeedbacks())
  }
  const handleClearAll = () => {
    if (confirm('Are you sure you want to delete all feedback?')) {
      dispatch(clearAllFeedbacks())
    }
  }
  const handleDeleteFeedback = (id) => {
    if (confirm('Delete this feedback?')) {
      dispatch(deleteFeedback(id))
    }
  }
  if (!isMounted) {
    return (
      <div>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Customer Feedback</h1>
        <div className="form-container">
          <div>Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Customer Feedback</h1>
      {isSubmitted && (
        <div style={{
          background: '#4CAF50',
          color: 'white',
          padding: '1rem',
          borderRadius: '4px',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          Thank you for your feedback! 🙂
        </div>
      )}
      <div className="form-container" style={{ maxWidth: '600px' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Your Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="category">Feedback Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem'
              }} >
              <option value="general">General Feedback</option>
              <option value="product">Product Suggestion</option>
              <option value="website">Website Experience</option>
              <option value="shipping">Shipping & Delivery</option>
              <option value="customer-service">Customer Service</option>
              <option value="bug">Bug Report</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Rating</label>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: star })}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '2rem',
                    cursor: 'pointer',
                    color: star <= formData.rating ? '#ffd700' : '#ddd',
                    transition: 'color 0.2s'
                  }}
                >
                  ★
                </button>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '0.5rem', color: '#666' }}>
              {formData.rating === 5 ? 'Excellent' : 
               formData.rating === 4 ? 'Good' : 
               formData.rating === 3 ? 'Average' : 
               formData.rating === 2 ? 'Poor' : 'Very Poor'}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="message">Your Feedback *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us what you think..."
              required
              rows="5"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem',
                fontFamily: 'inherit'
              }}
            />
          </div>
          
          <button type="submit" className="btn btn-primary">
            Submit Feedback
          </button>
        </form>
      </div>
      <div style={{ textAlign: 'center', margin: '3rem 0' }}>
        <button 
          onClick={handleToggleFeedbacks}
          className="btn"
          style={{ 
            width: 'auto', 
            background: '#3498db', 
            color: 'white',
            padding: '1rem 2rem',
            fontSize: '1.1rem'
          }}
        >
          {feedbackState.showFeedbacks ? 'Hide All Feedbacks' : 'View All Feedbacks'} 
          ({feedbackState.feedbacks.length})
        </button>
      </div>
      {feedbackState.showFeedbacks && (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '1rem' 
          }}>
            <h2>All Feedbacks ({feedbackState.feedbacks.length})</h2>
            {feedbackState.feedbacks.length > 0 && (
              <button 
                onClick={handleClearAll}
                className="btn btn-danger"
                style={{ width: 'auto' }}
              >
                Clear All
              </button>
            )}
          </div>

          {feedbackState.feedbacks.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '3rem', 
              background: 'white', 
              borderRadius: '8px',
              color: '#666'
            }}>
              No feedbacks yet. Be the first to share your thoughts!
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {feedbackState.feedbacks.map((feedback) => (
                <div 
                  key={feedback.id}
                  style={{
                    background: 'white',
                    padding: '1.5rem',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    borderLeft: `4px solid ${
                      feedback.rating === 5 ? '#2ecc71' :
                      feedback.rating === 4 ? '#3498db' :
                      feedback.rating === 3 ? '#f39c12' :
                      feedback.rating === 2 ? '#e67e22' : '#e74c3c'
                    }`
                  }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div>
                      <h3 style={{ margin: '0 0 0.5rem 0', color: '#2c3e50' }}>
                        {feedback.name}
                      </h3>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        <span style={{ color: '#666', fontSize: '0.9rem' }}>
                          {feedback.email}
                        </span>
                        <span style={{ 
                          background: '#ecf0f1', 
                          padding: '0.2rem 0.5rem', 
                          borderRadius: '12px', 
                          fontSize: '0.8rem',
                          textTransform: 'capitalize'
                        }}>
                          {feedback.category}
                        </span>
                        <span style={{ color: '#666', fontSize: '0.9rem' }}>
                          {feedback.timestamp}
                        </span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ color: '#ffd700', fontSize: '1.2rem' }}>
                        {'★'.repeat(feedback.rating)}
                        {'☆'.repeat(5 - feedback.rating)}
                      </div>
                      <button 
                        onClick={() => handleDeleteFeedback(feedback.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#e74c3c',
                          cursor: 'pointer',
                          padding: '0.5rem',
                          borderRadius: '4px'
                        }}
                        title="Delete feedback">
                        🗑️
                      </button>
                    </div>
                  </div>
                  
                  <div style={{ 
                    background: '#f8f9fa', 
                    padding: '1rem', 
                    borderRadius: '4px',
                    borderLeft: '3px solid #3498db'
                  }}>
                    <p style={{ margin: 0, lineHeight: '1.5', color: '#2c3e50' }}>
                      {feedback.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
    </div>
  )
}