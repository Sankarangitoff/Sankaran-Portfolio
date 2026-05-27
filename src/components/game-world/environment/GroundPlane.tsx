'use client'

import { useRef } from 'react'
import { Mesh } from 'three'

export default function GroundPlane() {
  const meshRef = useRef<Mesh>(null)

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
      <planeGeometry args={[200, 200]} />
      <meshStandardMaterial
        color="#0a0a0a"
        roughness={0.95}
        metalness={0.05}
      />
    </mesh>
  )
}
