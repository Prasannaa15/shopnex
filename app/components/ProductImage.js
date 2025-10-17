'use client'

import { useState } from 'react'

export default function ProductImage({ product, className = "" }) {
  const [imageError, setImageError] = useState(false)

  if (imageError || !product.image) {
    return (
      <div className={`product-image-fallback ${className}`}>
        <span>{product.name}</span>
      </div>
    )
  }

  return (
    <img 
      src={product.image} 
      alt={product.name}
      className={className}
      onError={() => setImageError(true)}
      style={{
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        borderRadius: '4px'
      }}
    />
  )
}