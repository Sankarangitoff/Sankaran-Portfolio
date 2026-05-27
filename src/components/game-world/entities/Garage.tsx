'use client'

import { RigidBody, CuboidCollider } from '@react-three/rapier'
import { Html, Text } from '@react-three/drei'
import { useGameState } from '../GameState'
import type { Project } from '@/types/content'

interface GarageProps {
  id: number
  project: Project
  position: [number, number, number]
}

export default function Garage({ id, project, position }: GarageProps) {
  const { activeGarage, setActiveGarage } = useGameState()
  const isActive = activeGarage === id

  const handleIntersectionEnter = () => {
    setActiveGarage(id)
  }

  const handleIntersectionExit = () => {
    if (activeGarage === id) setActiveGarage(null)
  }

  return (
    <group position={position}>
      {/* Sensor trigger */}
      <RigidBody type="fixed">
        <CuboidCollider
          args={[4, 3, 3]}
          sensor
          onIntersectionEnter={handleIntersectionEnter}
          onIntersectionExit={handleIntersectionExit}
        />
      </RigidBody>

      {/* Back wall */}
      <RigidBody type="fixed">
        <mesh position={[0, 2, -3]} castShadow receiveShadow>
          <boxGeometry args={[8, 4, 0.2]} />
          <meshStandardMaterial color="#141414" />
        </mesh>
      </RigidBody>

      {/* Side walls */}
      <RigidBody type="fixed">
        <mesh position={[-4, 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.2, 4, 6]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed">
        <mesh position={[4, 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.2, 4, 6]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      </RigidBody>

      {/* Roof */}
      <mesh position={[0, 4, 0]} receiveShadow>
        <boxGeometry args={[8.5, 0.3, 6.5]} />
        <meshStandardMaterial color="#111111" />
      </mesh>

      {/* Sign */}
      <Text
        position={[0, 4.5, 3]}
        fontSize={0.4}
        color="#FF8533"
        anchorX="center"
        anchorY="middle"
      >
        {`PIT STOP #${id + 1}`}
      </Text>

      {/* Overhead light */}
      <pointLight position={[0, 3.5, 0]} intensity={3} distance={10} color="#FFD700" />

      {/* Back wall: project screen */}
      <mesh position={[0, 2.5, -2.85]}>
        <planeGeometry args={[5, 3]} />
        <meshBasicMaterial color="#1a1a2e" />
      </mesh>

      {/* Project info as Html overlay (visible when car is inside) */}
      {isActive && (
        <Html position={[0, 2.5, -2.7]} center transform distanceFactor={8}>
          <div style={{
            width: 400,
            padding: 24,
            background: 'rgba(10,10,10,0.95)',
            border: '1px solid #FF6B00',
            borderRadius: 12,
            color: 'white',
            fontFamily: 'system-ui, sans-serif',
          }}>
            <h3 style={{ color: '#FF8533', fontSize: 18, margin: '0 0 8px' }}>{project.title}</h3>
            <p style={{ color: '#aaa', fontSize: 13, margin: '0 0 12px' }}>{project.challenge}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
              {project.techStack.map((tech, i) => (
                <span key={i} style={{
                  padding: '2px 8px',
                  background: 'rgba(255,107,0,0.15)',
                  border: '1px solid rgba(255,107,0,0.3)',
                  borderRadius: 12,
                  fontSize: 11,
                  color: '#FF8533',
                }}>{tech}</span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                  style={{ padding: '6px 14px', background: '#FF6B00', color: 'white', borderRadius: 6, fontSize: 12, textDecoration: 'none' }}>
                  Live ↗
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                  style={{ padding: '6px 14px', border: '1px solid #FF6B00', color: '#FF8533', borderRadius: 6, fontSize: 12, textDecoration: 'none' }}>
                  GitHub ↗
                </a>
              )}
            </div>
          </div>
        </Html>
      )}

      {/* Floor grid */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <planeGeometry args={[8, 6]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  )
}
