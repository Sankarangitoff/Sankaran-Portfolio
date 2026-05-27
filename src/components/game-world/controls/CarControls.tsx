'use client'

import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { CarRef } from '../entities/Car'
import { useGameState } from '../GameState'

interface CarControlsProps {
  carRef: React.RefObject<CarRef | null>
}

const ACCELERATION = 12
const STEERING = 3
const BRAKE_FORCE = 8
const MAX_SPEED = 15

export default function CarControls({ carRef }: CarControlsProps) {
  const keys = useRef({ forward: false, backward: false, left: false, right: false, brake: false })
  const { controlMode } = useGameState()

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case 'w': case 'arrowup': keys.current.forward = true; break
        case 's': case 'arrowdown': keys.current.backward = true; break
        case 'a': case 'arrowleft': keys.current.left = true; break
        case 'd': case 'arrowright': keys.current.right = true; break
        case ' ': keys.current.brake = true; break
      }
    }
    const onKeyUp = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case 'w': case 'arrowup': keys.current.forward = false; break
        case 's': case 'arrowdown': keys.current.backward = false; break
        case 'a': case 'arrowleft': keys.current.left = false; break
        case 'd': case 'arrowright': keys.current.right = false; break
        case ' ': keys.current.brake = false; break
      }
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  useFrame((_, delta) => {
    if (controlMode !== 'car') return
    const rb = carRef.current?.rigidBody
    if (!rb) return

    const velocity = rb.linvel()
    const speed = Math.sqrt(velocity.x ** 2 + velocity.z ** 2)

    // Get forward direction from rotation
    const rot = rb.rotation()
    const forward = { x: -Math.sin(rot.y || 0), z: -Math.cos(rot.y || 0) }

    // Clamp to max speed
    if (speed < MAX_SPEED) {
      if (keys.current.forward) {
        rb.applyImpulse({ x: forward.x * ACCELERATION * delta, y: 0, z: forward.z * ACCELERATION * delta }, true)
      }
      if (keys.current.backward) {
        rb.applyImpulse({ x: -forward.x * ACCELERATION * delta * 0.5, y: 0, z: -forward.z * ACCELERATION * delta * 0.5 }, true)
      }
    }

    // Steering via torque
    if (keys.current.left) {
      rb.applyTorqueImpulse({ x: 0, y: STEERING * delta, z: 0 }, true)
    }
    if (keys.current.right) {
      rb.applyTorqueImpulse({ x: 0, y: -STEERING * delta, z: 0 }, true)
    }

    // Brake
    if (keys.current.brake) {
      rb.setLinvel({ x: velocity.x * (1 - BRAKE_FORCE * delta), y: velocity.y, z: velocity.z * (1 - BRAKE_FORCE * delta) }, true)
    }
  })

  return null
}
