'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

export default function FloatingShapes() {
  const torusRef = useRef<THREE.Mesh>(null)
  const sphereRef = useRef<THREE.Mesh>(null)
  const octaRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (torusRef.current) torusRef.current.rotation.y = t * 0.1
    if (sphereRef.current) sphereRef.current.rotation.x = t * 0.15
    if (octaRef.current) octaRef.current.rotation.z = t * 0.12
  })

  return (
    <>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={torusRef} position={[2, 0, 0]}>
          <torusGeometry args={[1, 0.4, 16, 32]} />
          <MeshDistortMaterial color="#FF6B00" metalness={0.8} roughness={0.2} distort={0.2} />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh ref={sphereRef} position={[-1, 1.5, -1]}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <MeshDistortMaterial color="#FF8533" metalness={0.9} roughness={0.1} distort={0.3} />
        </mesh>
      </Float>
      <Float speed={2.5} rotationIntensity={0.4} floatIntensity={1.2}>
        <mesh ref={octaRef} position={[0, -1, 1]}>
          <octahedronGeometry args={[0.6]} />
          <MeshDistortMaterial color="#FF6B00" metalness={0.7} roughness={0.3} distort={0.15} />
        </mesh>
      </Float>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
    </>
  )
}
