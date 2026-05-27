'use client'

import { useProgress } from '@react-three/drei'
import { useState, useEffect } from 'react'

export default function LoadingScreen() {
  const { progress, active, total } = useProgress()
  const [show, setShow] = useState(true)

  // If no assets to load (all procedural geometry), treat as loaded immediately
  const isLoaded = (!active && total === 0) || (!active && progress === 100)

  // Minimum 2s display, then fade out
  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => setShow(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [isLoaded])

  if (!show) return null

  const displayProgress = total === 0 ? (isLoaded ? 100 : 0) : progress
  const message = displayProgress < 30
    ? 'Loading track...'
    : displayProgress < 70
      ? 'Warming up engine...'
      : 'Ready to race!'

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0A0A0A',
        transition: 'opacity 0.5s',
        opacity: isLoaded ? 0 : 1,
        pointerEvents: isLoaded ? 'none' : 'auto',
      }}
    >
      <div style={{ color: '#FF6B00', fontSize: 24, fontWeight: 'bold', marginBottom: 24 }}>
        {message}
      </div>

      {/* Fuel gauge */}
      <div style={{
        width: 280,
        height: 16,
        background: '#1a1a1a',
        borderRadius: 8,
        border: '1px solid #333',
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${displayProgress}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #FF6B00, #FF8533)',
          borderRadius: 8,
          transition: 'width 0.3s ease',
        }} />
      </div>

      <div style={{ color: '#666', fontSize: 12, marginTop: 12 }}>
        {Math.round(displayProgress)}%
      </div>
    </div>
  )
}
