'use client'

import { useRef, forwardRef, useImperativeHandle } from 'react'
import { RigidBody, type RapierRigidBody } from '@react-three/rapier'
import * as THREE from 'three'

export interface CarRef {
  rigidBody: RapierRigidBody | null
  getPosition: () => THREE.Vector3
  getRotation: () => THREE.Quaternion
}

interface CarProps {
  startPosition?: [number, number, number]
}

const Car = forwardRef<CarRef, CarProps>(function Car(
  { startPosition = [25, 0.5, 0] },
  ref
) {
  const rigidBodyRef = useRef<RapierRigidBody>(null)
  const meshGroupRef = useRef<THREE.Group>(null)

  useImperativeHandle(ref, () => ({
    rigidBody: rigidBodyRef.current,
    getPosition: () => {
      if (!rigidBodyRef.current) return new THREE.Vector3()
      const pos = rigidBodyRef.current.translation()
      return new THREE.Vector3(pos.x, pos.y, pos.z)
    },
    getRotation: () => {
      if (!rigidBodyRef.current) return new THREE.Quaternion()
      const rot = rigidBodyRef.current.rotation()
      return new THREE.Quaternion(rot.x, rot.y, rot.z, rot.w)
    },
  }))

  return (
    <RigidBody
      ref={rigidBodyRef}
      type="dynamic"
      position={startPosition}
      colliders="cuboid"
      mass={1}
      linearDamping={2}
      angularDamping={3}
    >
      <group ref={meshGroupRef}>
        {/* Car body */}
        <mesh position={[0, 0.15, 0]} castShadow>
          <boxGeometry args={[1.2, 0.3, 0.6]} />
          <meshStandardMaterial color="#e63900" metalness={0.6} roughness={0.3} />
        </mesh>

        {/* Cabin */}
        <mesh position={[0, 0.35, 0]} castShadow>
          <boxGeometry args={[0.6, 0.2, 0.5]} />
          <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Wheels */}
        {[[-0.4, 0, 0.3], [-0.4, 0, -0.3], [0.4, 0, 0.3], [0.4, 0, -0.3]].map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.08, 12]} />
            <meshStandardMaterial color="#222222" />
          </mesh>
        ))}

        {/* Headlights */}
        <pointLight position={[0.6, 0.2, 0.2]} intensity={2} distance={8} color="#FFD700" castShadow />
        <pointLight position={[0.6, 0.2, -0.2]} intensity={2} distance={8} color="#FFD700" castShadow />
        {[0.2, -0.2].map((z, i) => (
          <mesh key={`hl-${i}`} position={[0.61, 0.2, z]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial color="#FFD700" />
          </mesh>
        ))}
      </group>
    </RigidBody>
  )
})

export default Car
