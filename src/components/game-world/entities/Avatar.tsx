'use client'

import { useRef, forwardRef, useImperativeHandle } from 'react'
import { useFrame } from '@react-three/fiber'
import { RigidBody, CapsuleCollider, type RapierRigidBody } from '@react-three/rapier'
import * as THREE from 'three'

export interface AvatarRef {
  rigidBody: RapierRigidBody | null
  getPosition: () => THREE.Vector3
}

type AnimationState = 'idle' | 'run' | 'jump' | 'interact'

interface AvatarProps {
  startPosition?: [number, number, number]
  animationState?: AnimationState
  direction?: 'left' | 'right'
}

const Avatar = forwardRef<AvatarRef, AvatarProps>(function Avatar(
  { startPosition = [0, 2, 0], animationState = 'idle', direction = 'right' },
  ref
) {
  const rigidBodyRef = useRef<RapierRigidBody>(null)
  const meshRef = useRef<THREE.Group>(null)
  const armSwing = useRef(0)

  useImperativeHandle(ref, () => ({
    rigidBody: rigidBodyRef.current,
    getPosition: () => {
      if (!rigidBodyRef.current) return new THREE.Vector3()
      const pos = rigidBodyRef.current.translation()
      return new THREE.Vector3(pos.x, pos.y, pos.z)
    },
  }))

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()

    // Face direction
    meshRef.current.rotation.y = direction === 'right' ? 0 : Math.PI

    // Animations
    if (animationState === 'run') {
      armSwing.current = Math.sin(t * 8) * 0.4
      meshRef.current.position.y = Math.abs(Math.sin(t * 8)) * 0.05
    } else if (animationState === 'idle') {
      armSwing.current = 0
      meshRef.current.position.y = Math.sin(t * 2) * 0.02
    } else if (animationState === 'jump') {
      armSwing.current = -0.5
    }
  })

  return (
    <RigidBody
      ref={rigidBodyRef}
      type="dynamic"
      position={startPosition}
      lockRotations
      mass={1}
      linearDamping={0.5}
    >
      <CapsuleCollider args={[0.25, 0.2]} position={[0, 0.45, 0]} />

      <group ref={meshRef}>
        {/* Head */}
        <mesh position={[0, 0.85, 0]} castShadow>
          <sphereGeometry args={[0.18, 12, 10]} />
          <meshStandardMaterial color="#FFB088" />
        </mesh>

        {/* Hair */}
        <mesh position={[0, 0.95, -0.02]} castShadow>
          <sphereGeometry args={[0.19, 12, 10, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#333333" />
        </mesh>

        {/* Eyes */}
        <mesh position={[-0.06, 0.85, 0.15]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial color="#333333" />
        </mesh>
        <mesh position={[0.06, 0.85, 0.15]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial color="#333333" />
        </mesh>

        {/* Body */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[0.3, 0.35, 0.2]} />
          <meshStandardMaterial color="#e63900" />
        </mesh>

        {/* Left arm */}
        <mesh position={[-0.22, 0.5, 0]} rotation={[armSwing.current, 0, 0]} castShadow>
          <boxGeometry args={[0.08, 0.3, 0.08]} />
          <meshStandardMaterial color="#FFB088" />
        </mesh>

        {/* Right arm */}
        <mesh position={[0.22, 0.5, 0]} rotation={[-armSwing.current, 0, 0]} castShadow>
          <boxGeometry args={[0.08, 0.3, 0.08]} />
          <meshStandardMaterial color="#FFB088" />
        </mesh>

        {/* Legs */}
        <mesh position={[-0.08, 0.15, 0]} rotation={[-armSwing.current, 0, 0]} castShadow>
          <boxGeometry args={[0.1, 0.3, 0.1]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
        <mesh position={[0.08, 0.15, 0]} rotation={[armSwing.current, 0, 0]} castShadow>
          <boxGeometry args={[0.1, 0.3, 0.1]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
      </group>
    </RigidBody>
  )
})

export default Avatar
