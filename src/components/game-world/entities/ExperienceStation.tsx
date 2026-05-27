'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import { Html, Text } from '@react-three/drei'
import * as THREE from 'three'
import type { ExperienceEntry } from '@/types/content'

interface ExperienceStationProps {
  entry: ExperienceEntry
  position: [number, number, number]
  isActive: boolean
  isNear: boolean
  onInteract: () => void
}

export default function ExperienceStation({ entry, position, isActive, isNear, onInteract }: ExperienceStationProps) {
  const glowRef = useRef<THREE.PointLight>(null)

  // Keep onInteract available for future proximity-based interaction wiring
  void onInteract

  useFrame(({ clock }) => {
    if (glowRef.current) {
      glowRef.current.intensity = isNear ? 3 + Math.sin(clock.getElapsedTime() * 3) : 1
    }
  })

  return (
    <group position={position}>
      {/* Kiosk base */}
      <RigidBody type="fixed">
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[0.6, 1, 0.4]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.5} roughness={0.4} />
        </mesh>
      </RigidBody>

      {/* Screen */}
      <mesh position={[0, 1.1, 0.21]}>
        <planeGeometry args={[0.5, 0.35]} />
        <meshBasicMaterial color={isNear ? '#FF6B00' : '#333333'} />
      </mesh>

      {/* Company name on screen */}
      <Text
        position={[0, 1.1, 0.22]}
        fontSize={0.08}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {entry.company.split(',')[0]}
      </Text>

      {/* Glow */}
      <pointLight ref={glowRef} position={[0, 1.3, 0.5]} intensity={1} distance={3} color="#FF6B00" />

      {/* "Press E" prompt */}
      {isNear && !isActive && (
        <Text position={[0, 1.8, 0]} fontSize={0.12} color="#FF6B00" anchorX="center">
          Press E
        </Text>
      )}

      {/* Experience card popup */}
      {isActive && (
        <Html position={[1.5, 1.5, 0]} center distanceFactor={6}>
          <div style={{
            width: 350,
            padding: 20,
            background: 'rgba(10,10,10,0.95)',
            border: '1px solid #FF6B00',
            borderRadius: 12,
            color: 'white',
            fontFamily: 'system-ui, sans-serif',
          }}>
            <h3 style={{ color: '#FF8533', fontSize: 16, margin: '0 0 4px' }}>{entry.role}</h3>
            <p style={{ color: '#aaa', fontSize: 12, margin: '0 0 10px' }}>
              {entry.company} &bull; {entry.startDate} - {entry.isPresent ? 'Present' : entry.endDate}
            </p>
            <ul style={{ paddingLeft: 16, margin: '0 0 10px' }}>
              {entry.achievements.slice(0, 4).map((a, i) => (
                <li key={i} style={{ color: '#ccc', fontSize: 11, marginBottom: 4 }}>{a}</li>
              ))}
            </ul>
            {entry.techStack && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {entry.techStack.map((tech, i) => (
                  <span key={i} style={{
                    padding: '2px 6px',
                    background: 'rgba(255,107,0,0.15)',
                    border: '1px solid rgba(255,107,0,0.3)',
                    borderRadius: 10,
                    fontSize: 10,
                    color: '#FF8533',
                  }}>{tech}</span>
                ))}
              </div>
            )}
          </div>
        </Html>
      )}
    </group>
  )
}
