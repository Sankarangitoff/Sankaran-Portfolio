'use client'

import { useMemo, useState } from 'react'
import { RigidBody } from '@react-three/rapier'
import CityBackdrop from '../environment/CityBackdrop'
import ExperienceStation from '../entities/ExperienceStation'
import Collectible from '../entities/Collectible'
import type { ExperienceEntry } from '@/types/content'
import { useGameState } from '../GameState'

interface ExperiencePlatformerProps {
  entries: ExperienceEntry[]
  entryPosition: [number, number, number]
}

const PLATFORM_SPACING = 12
const GROUND_Y = 0

export default function ExperiencePlatformer({ entries, entryPosition }: ExperiencePlatformerProps) {
  const { activeStation, setActiveStation } = useGameState()
  const [collectedOrbs, setCollectedOrbs] = useState<Set<number>>(new Set())

  // Setter will be wired up when collection detection is implemented
  void setCollectedOrbs

  const sortedEntries = useMemo(
    () => [...entries].sort((a, b) => (a.order || 0) - (b.order || 0)),
    [entries]
  )

  // Platform layout
  const platforms = useMemo(() => {
    return sortedEntries.map((_, i) => ({
      x: i * PLATFORM_SPACING,
      y: GROUND_Y + 1 + (i % 2) * 1.5,
      width: 5,
    }))
  }, [sortedEntries])

  // Collectible positions between platforms
  const orbs = useMemo(() => {
    const o: [number, number, number][] = []
    for (let i = 0; i < platforms.length - 1; i++) {
      const startX = platforms[i].x + 3
      const endX = platforms[i + 1].x - 3
      for (let j = 0; j < 3; j++) {
        const x = startX + (endX - startX) * ((j + 1) / 4)
        o.push([x, 2, 0])
      }
    }
    return o
  }, [platforms])

  return (
    <group position={entryPosition}>
      {/* City backdrop */}
      <CityBackdrop width={sortedEntries.length * PLATFORM_SPACING + 20} position={[sortedEntries.length * PLATFORM_SPACING / 2, 0, -15]} />

      {/* Ground */}
      <RigidBody type="fixed">
        <mesh position={[sortedEntries.length * PLATFORM_SPACING / 2, -0.1, 0]} receiveShadow>
          <boxGeometry args={[sortedEntries.length * PLATFORM_SPACING + 20, 0.2, 4]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>
      </RigidBody>

      {/* Platforms */}
      {platforms.map((p, i) => (
        <RigidBody key={i} type="fixed">
          <mesh position={[p.x, p.y, 0]} castShadow receiveShadow>
            <boxGeometry args={[p.width, 0.3, 2]} />
            <meshStandardMaterial color="#1a1a2e" />
          </mesh>
          {/* Orange edge highlight */}
          <mesh position={[p.x, p.y + 0.16, 0]}>
            <boxGeometry args={[p.width, 0.02, 2.02]} />
            <meshBasicMaterial color="#FF6B00" opacity={0.3} transparent />
          </mesh>
        </RigidBody>
      ))}

      {/* Experience stations on platforms */}
      {sortedEntries.map((entry, i) => (
        <ExperienceStation
          key={i}
          entry={entry}
          position={[platforms[i].x, platforms[i].y + 0.15, 0]}
          isActive={activeStation === i}
          isNear={false}
          onInteract={() => setActiveStation(activeStation === i ? null : i)}
        />
      ))}

      {/* Collectibles */}
      {orbs.map((pos, i) => (
        <Collectible
          key={i}
          position={pos}
          collected={collectedOrbs.has(i)}
        />
      ))}

      {/* Ambient platformer lighting */}
      <pointLight position={[sortedEntries.length * PLATFORM_SPACING / 2, 8, 5]} intensity={0.5} distance={60} color="#ffffff" />
    </group>
  )
}
