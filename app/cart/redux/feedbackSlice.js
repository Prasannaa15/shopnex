'use client'

import { createSlice } from '@reduxjs/toolkit'
const loadFeedbackFromStorage = () => {
  if (typeof window !== 'undefined') {
    const savedFeedback = localStorage.getItem('feedbacks')
    return savedFeedback ? JSON.parse(savedFeedback) : []
  }
  return []
}
const initialState = {
  feedbacks: loadFeedbackFromStorage(),
  showFeedbacks: false
}
export const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    addFeedback: (state, action) => {
      const newFeedback = {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleString('en-IN'),
        ...action.payload
      }
      state.feedbacks.unshift(newFeedback)
      if (typeof window !== 'undefined') {
        localStorage.setItem('feedbacks', JSON.stringify(state.feedbacks))
      }
    },
    toggleShowFeedbacks: (state) => {
      state.showFeedbacks = !state.showFeedbacks
    },
    clearAllFeedbacks: (state) => {
      state.feedbacks = []
      state.showFeedbacks = false
      if (typeof window !== 'undefined') {
        localStorage.removeItem('feedbacks')
      }
    },
    deleteFeedback: (state, action) => {
      state.feedbacks = state.feedbacks.filter(feedback => feedback.id !== action.payload)
      if (typeof window !== 'undefined') {
        localStorage.setItem('feedbacks', JSON.stringify(state.feedbacks))
      }
    }
  },
})
export const { addFeedback, toggleShowFeedbacks, clearAllFeedbacks, deleteFeedback } = feedbackSlice.actions
export default feedbackSlice.reducer