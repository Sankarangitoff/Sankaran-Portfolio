'use client'

import { RigidBody } from '@react-three/rapier'
import * as THREE from 'three'

function Cone({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position} castShadow>
      <coneGeometry args={[0.15, 0.4, 6]} />
      <meshStandardMaterial color="#FF6B00" />
    </mesh>
  )
}

function SmallTree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.3, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.07, 0.6, 6]} />
        <meshStandardMaterial color="#4a3728" />
      </mesh>
      <mesh position={[0, 0.7, 0]} castShadow>
        <sphereGeometry args={[0.3, 8, 6]} />
        <meshStandardMaterial color="#1a4a1a" />
      </mesh>
    </group>
  )
}

function Guardrail({ points }: { points: THREE.Vector3[] }) {
  return (
    <group>
      {points.map((pos, i) => (
        <RigidBody key={i} type="fixed" position={[pos.x, pos.y, pos.z]}>
          <mesh castShadow>
            <boxGeometry args={[0.1, 0.3, 0.5]} />
            <meshStandardMaterial color="#FF6B00" opacity={0.6} transparent />
          </mesh>
        </RigidBody>
      ))}
    </group>
  )
}

interface SceneryProps {
  trackRadiusX: number
  trackRadiusZ: number
}

export default function Scenery({ trackRadiusX, trackRadiusZ }: SceneryProps) {
  // Place trees and cones around the outside of the track
  const decorations: { type: 'tree' | 'cone'; position: [number, number, number] }[] = []
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2
    const r = trackRadiusX + 5 + Math.random() * 3
    const rz = trackRadiusZ + 5 + Math.random() * 3
    decorations.push({
      type: i % 3 === 0 ? 'tree' : 'cone',
      position: [Math.cos(angle) * r, 0, Math.sin(angle) * rz],
    })
  }

  // Guardrail positions along outer edge
  const guardrailPts: THREE.Vector3[] = []
  for (let i = 0; i < 32; i++) {
    const angle = (i / 32) * Math.PI * 2
    guardrailPts.push(new THREE.Vector3(
      Math.cos(angle) * (trackRadiusX + 2.5),
      0.15,
      Math.sin(angle) * (trackRadiusZ + 2.5),
    ))
  }

  return (
    <group>
      {decorations.map((d, i) =>
        d.type === 'tree'
          ? <SmallTree key={i} position={d.position} />
          : <Cone key={i} position={d.position} />
      )}
      <Guardrail points={guardrailPts} />
    </group>
  )
}
