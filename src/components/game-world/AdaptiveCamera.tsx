'use client'

import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useGameState } from './GameState'
import type { CarRef } from './entities/Car'

interface AdaptiveCameraProps {
  carRef: React.RefObject<CarRef | null>
  avatarPosition?: THREE.Vector3
}

const CIRCUIT_OFFSET = new THREE.Vector3(0, 30, 20)
const GARAGE_OFFSET = new THREE.Vector3(0, 5, 8)
const PLATFORMER_OFFSET = new THREE.Vector3(0, 3, 15)
const LERP_SPEED = 2

export default function AdaptiveCamera({ carRef, avatarPosition }: AdaptiveCameraProps) {
  const { camera } = useThree()
  const { currentZone, activeGarage } = useGameState()
  const targetPos = useRef(new THREE.Vector3())

  useFrame((_, delta) => {
    let followTarget: THREE.Vector3

    if (currentZone === 'platformer' && avatarPosition) {
      followTarget = avatarPosition
    } else {
      followTarget = carRef.current?.getPosition() ?? new THREE.Vector3()
    }

    // Determine camera offset based on zone
    let offset: THREE.Vector3
    if (currentZone === 'circuit') {
      offset = CIRCUIT_OFFSET
    } else if (currentZone === 'garages' && activeGarage !== null) {
      offset = GARAGE_OFFSET
    } else if (currentZone === 'platformer') {
      offset = PLATFORMER_OFFSET
    } else {
      offset = CIRCUIT_OFFSET
    }

    // Target position = follow target + offset
    targetPos.current.copy(followTarget).add(offset)

    // Smooth interpolation
    camera.position.lerp(targetPos.current, LERP_SPEED * delta)

    // Look at the follow target
    camera.lookAt(followTarget)
  })

  return null
}
