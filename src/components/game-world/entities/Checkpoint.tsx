'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RigidBody, CuboidCollider } from '@react-three/rapier'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import { useGameState } from '../GameState'

interface CheckpointProps {
  id: number
  label: string
  position: [number, number, number]
}

export default function Checkpoint({ id, label, position }: CheckpointProps) {
  const ringRef = useRef<THREE.Mesh>(null)
  const { activeCheckpoint, visitCheckpoint, setActiveCheckpoint } = useGameState()
  const isActive = activeCheckpoint === id

  // Pulsing glow ring
  useFrame(({ clock }) => {
    if (ringRef.current) {
      const scale = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.1
      ringRef.current.scale.set(scale, scale, 1)
    }
  })

  const handleIntersectionEnter = () => {
    visitCheckpoint(id)
    setActiveCheckpoint(id)
  }

  const handleIntersectionExit = () => {
    if (activeCheckpoint === id) {
      setActiveCheckpoint(null)
    }
  }

  return (
    <group position={position}>
      {/* Sensor trigger zone */}
      <RigidBody type="fixed">
        <CuboidCollider
          args={[2, 2, 2]}
          sensor
          onIntersectionEnter={handleIntersectionEnter}
          onIntersectionExit={handleIntersectionExit}
        />
      </RigidBody>

      {/* Pillar */}
      <mesh position={[0, 0.75, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.1, 1.5, 8]} />
        <meshStandardMaterial color="#333333" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Flag */}
      <mesh position={[0.4, 1.3, 0]}>
        <planeGeometry args={[0.8, 0.4]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
      <Text
        position={[0.4, 1.3, 0.01]}
        fontSize={0.15}
        color="#FF8533"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>

      {/* Glow ring on ground */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[0.8, 1, 32]} />
        <meshBasicMaterial
          color="#FF6B00"
          opacity={isActive ? 0.5 : 0.2}
          transparent
        />
      </mesh>
    </group>
  )
}
