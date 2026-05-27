'use client'

import { useMemo } from 'react'
import TrackSurface from '../environment/TrackSurface'
import Scenery from '../environment/Scenery'
import Checkpoint from '../entities/Checkpoint'
import HolographicTree from '../entities/HolographicTree'
import { useGameState } from '../GameState'
import type { SkillCategory } from '@/types/content'

interface SkillsCircuitProps {
  categories: SkillCategory[]
}

const TRACK_RADIUS_X = 25
const TRACK_RADIUS_Z = 15

export default function SkillsCircuit({ categories }: SkillsCircuitProps) {
  const { activeCheckpoint } = useGameState()

  // Place 6 checkpoints evenly around the oval
  const checkpoints = useMemo(() => {
    return categories.map((cat, i) => {
      const angle = (i / categories.length) * Math.PI * 2
      return {
        id: i,
        label: cat.name,
        position: [
          Math.cos(angle) * TRACK_RADIUS_X,
          0,
          Math.sin(angle) * TRACK_RADIUS_Z,
        ] as [number, number, number],
        category: cat,
      }
    })
  }, [categories])

  return (
    <group>
      <TrackSurface
        radiusX={TRACK_RADIUS_X}
        radiusZ={TRACK_RADIUS_Z}
        trackWidth={4}
      />

      <Scenery
        trackRadiusX={TRACK_RADIUS_X}
        trackRadiusZ={TRACK_RADIUS_Z}
      />

      {/* Checkpoints */}
      {checkpoints.map(cp => (
        <Checkpoint
          key={cp.id}
          id={cp.id}
          label={cp.label}
          position={cp.position}
        />
      ))}

      {/* Holographic trees — one per checkpoint, only active one visible */}
      {checkpoints.map(cp => (
        <HolographicTree
          key={`tree-${cp.id}`}
          category={cp.category}
          visible={activeCheckpoint === cp.id}
          position={[0, 0, 0]}
        />
      ))}

      {/* Start/finish line */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[TRACK_RADIUS_X, 0.03, 0]}>
        <planeGeometry args={[0.2, 4]} />
        <meshBasicMaterial color="#ffffff" opacity={0.6} transparent />
      </mesh>
    </group>
  )
}
