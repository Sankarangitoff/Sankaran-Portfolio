'use client'

import { useMemo } from 'react'
import { RigidBody } from '@react-three/rapier'
import Garage from '../entities/Garage'
import type { Project } from '@/types/content'

interface ProjectGaragesProps {
  projects: Project[]
  entryPosition: [number, number, number]
}

const GARAGE_SPACING = 20
const ROAD_WIDTH = 4

export default function ProjectGarages({ projects, entryPosition }: ProjectGaragesProps) {
  const sortedProjects = useMemo(
    () => [...projects].sort((a, b) => (a.order || 0) - (b.order || 0)),
    [projects]
  )

  const roadLength = (sortedProjects.length + 1) * GARAGE_SPACING

  return (
    <group position={entryPosition}>
      {/* Road surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[roadLength / 2, 0.01, 0]} receiveShadow>
        <planeGeometry args={[roadLength, ROAD_WIDTH]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.85} />
      </mesh>

      {/* Center dashed line */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[roadLength / 2, 0.02, 0]}>
        <planeGeometry args={[roadLength, 0.1]} />
        <meshBasicMaterial color="#555555" opacity={0.5} transparent />
      </mesh>

      {/* Garages — alternating sides of the road */}
      {sortedProjects.map((project, i) => (
        <Garage
          key={i}
          id={i}
          project={project}
          position={[(i + 1) * GARAGE_SPACING, 0, i % 2 === 0 ? 6 : -6]}
        />
      ))}

      {/* Road collision walls */}
      <RigidBody type="fixed">
        <mesh position={[roadLength / 2, 0.15, ROAD_WIDTH / 2 + 0.1]}>
          <boxGeometry args={[roadLength, 0.3, 0.1]} />
          <meshStandardMaterial color="#FF6B00" opacity={0.3} transparent />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed">
        <mesh position={[roadLength / 2, 0.15, -(ROAD_WIDTH / 2 + 0.1)]}>
          <boxGeometry args={[roadLength, 0.3, 0.1]} />
          <meshStandardMaterial color="#FF6B00" opacity={0.3} transparent />
        </mesh>
      </RigidBody>
    </group>
  )
}
