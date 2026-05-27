'use client'

import { useFrame } from '@react-three/fiber'
import { useGameState } from '../GameState'
import type { CarRef } from '../entities/Car'

interface ControlSwitcherProps {
  carRef: React.RefObject<CarRef | null>
  garageEntryX: number
  platformerEntryX: number
}

export default function ControlSwitcher({ carRef, garageEntryX, platformerEntryX }: ControlSwitcherProps) {
  const { currentZone, allCheckpointsVisited, setCurrentZone, setControlMode } = useGameState()

  useFrame(() => {
    const pos = carRef.current?.getPosition()
    if (!pos) return

    // Zone detection based on car X position
    if (currentZone === 'circuit' && allCheckpointsVisited && pos.x > garageEntryX - 2) {
      setCurrentZone('garages')
    }

    if (currentZone === 'garages' && pos.x > platformerEntryX - 2) {
      setCurrentZone('platformer')
      setControlMode('platformer')
    }
  })

  return null
}
