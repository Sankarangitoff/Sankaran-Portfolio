'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface CollectibleProps {
  position: [number, number, number]
  collected: boolean
}

export default function Collectible({ position, collected }: CollectibleProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (meshRef.current && !collected) {
      meshRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 3 + position[0]) * 0.15
      meshRef.current.rotation.y += 0.02
    }
  })

  if (collected) return null

  return (
    <mesh ref={meshRef} position={position} castShadow>
      <octahedronGeometry args={[0.12, 0]} />
      <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.5} metalness={0.8} roughness={0.2} />
      <pointLight position={[0, 0, 0]} intensity={0.5} distance={2} color="#FFD700" />
    </mesh>
  )
}
