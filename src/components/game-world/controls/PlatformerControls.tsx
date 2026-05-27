'use client'

import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { AvatarRef } from '../entities/Avatar'
import { useGameState } from '../GameState'

interface PlatformerControlsProps {
  avatarRef: React.RefObject<AvatarRef | null>
  onAnimationChange: (state: 'idle' | 'run' | 'jump' | 'interact') => void
  onDirectionChange: (dir: 'left' | 'right') => void
  onPositionUpdate: (x: number, y: number, z: number) => void
}

const MOVE_SPEED = 5
const JUMP_FORCE = 6

export default function PlatformerControls({
  avatarRef, onAnimationChange, onDirectionChange, onPositionUpdate,
}: PlatformerControlsProps) {
  const keys = useRef({ left: false, right: false, jump: false, interact: false })
  const { controlMode } = useGameState()
  const isGrounded = useRef(true)
  const jumpCooldown = useRef(false)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case 'a': case 'arrowleft': keys.current.left = true; break
        case 'd': case 'arrowright': keys.current.right = true; break
        case 'w': case 'arrowup': case ' ': keys.current.jump = true; break
        case 'e': case 'enter': keys.current.interact = true; break
      }
    }
    const onKeyUp = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case 'a': case 'arrowleft': keys.current.left = false; break
        case 'd': case 'arrowright': keys.current.right = false; break
        case 'w': case 'arrowup': case ' ': keys.current.jump = false; break
        case 'e': case 'enter': keys.current.interact = false; break
      }
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  useFrame(() => {
    if (controlMode !== 'platformer') return
    const rb = avatarRef.current?.rigidBody
    if (!rb) return

    const vel = rb.linvel()
    const pos = rb.translation()

    // Ground check
    const grounded = pos.y < 1.2 && Math.abs(vel.y) < 0.5
    isGrounded.current = grounded

    // Horizontal movement
    let moveX = 0
    if (keys.current.left) { moveX = -MOVE_SPEED; onDirectionChange('left') }
    if (keys.current.right) { moveX = MOVE_SPEED; onDirectionChange('right') }

    rb.setLinvel({ x: moveX, y: vel.y, z: 0 }, true)

    // Lock Z position (side-scroller)
    if (Math.abs(pos.z) > 0.1) {
      rb.setTranslation({ x: pos.x, y: pos.y, z: 0 }, true)
    }

    // Jump
    if (keys.current.jump && grounded && !jumpCooldown.current) {
      rb.applyImpulse({ x: 0, y: JUMP_FORCE, z: 0 }, true)
      jumpCooldown.current = true
      setTimeout(() => { jumpCooldown.current = false }, 300)
    }

    // Animation state
    if (!grounded) onAnimationChange('jump')
    else if (moveX !== 0) onAnimationChange('run')
    else onAnimationChange('idle')

    // Position callback
    onPositionUpdate(pos.x, pos.y, pos.z)
  })

  return null
}
