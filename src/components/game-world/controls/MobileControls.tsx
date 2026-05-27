'use client'

import { useEffect, useState } from 'react'

interface MobileControlsProps {
  controlMode: 'car' | 'platformer'
  onInput: (input: { left: boolean; right: boolean; forward: boolean; backward: boolean; jump: boolean; interact: boolean }) => void
}

export default function MobileControlsOverlay({ controlMode, onInput }: MobileControlsProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile('ontouchstart' in window || window.innerWidth < 768)
  }, [])

  if (!isMobile) return null

  const buttonStyle = (active?: boolean): React.CSSProperties => ({
    width: 56,
    height: 56,
    borderRadius: '50%',
    border: `2px solid ${active ? '#FF6B00' : '#333'}`,
    background: active ? 'rgba(255,107,0,0.2)' : 'rgba(0,0,0,0.5)',
    color: active ? '#FF8533' : '#666',
    fontSize: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    touchAction: 'none',
    userSelect: 'none',
  })

  return (
    <div style={{
      position: 'absolute',
      bottom: 20,
      left: 0,
      right: 0,
      display: 'flex',
      justifyContent: 'space-between',
      padding: '0 20px',
      pointerEvents: 'none',
      zIndex: 50,
    }}>
      {/* Left side: directional */}
      <div style={{ display: 'flex', gap: 12, pointerEvents: 'auto' }}>
        <button
          style={buttonStyle()}
          onTouchStart={() => onInput({ left: true, right: false, forward: false, backward: false, jump: false, interact: false })}
          onTouchEnd={() => onInput({ left: false, right: false, forward: false, backward: false, jump: false, interact: false })}
        >
          &#8592;
        </button>
        {controlMode === 'car' && (
          <button
            style={buttonStyle()}
            onTouchStart={() => onInput({ left: false, right: false, forward: true, backward: false, jump: false, interact: false })}
            onTouchEnd={() => onInput({ left: false, right: false, forward: false, backward: false, jump: false, interact: false })}
          >
            &#8593;
          </button>
        )}
        <button
          style={buttonStyle()}
          onTouchStart={() => onInput({ left: false, right: true, forward: false, backward: false, jump: false, interact: false })}
          onTouchEnd={() => onInput({ left: false, right: false, forward: false, backward: false, jump: false, interact: false })}
        >
          &#8594;
        </button>
      </div>

      {/* Right side: actions */}
      <div style={{ display: 'flex', gap: 12, pointerEvents: 'auto' }}>
        {controlMode === 'platformer' && (
          <button
            style={buttonStyle()}
            onTouchStart={() => onInput({ left: false, right: false, forward: false, backward: false, jump: true, interact: false })}
            onTouchEnd={() => onInput({ left: false, right: false, forward: false, backward: false, jump: false, interact: false })}
          >
            &#8593;
          </button>
        )}
        <button
          style={buttonStyle()}
          onTouchStart={() => onInput({ left: false, right: false, forward: false, backward: false, jump: false, interact: true })}
          onTouchEnd={() => onInput({ left: false, right: false, forward: false, backward: false, jump: false, interact: false })}
        >
          E
        </button>
      </div>
    </div>
  )
}
