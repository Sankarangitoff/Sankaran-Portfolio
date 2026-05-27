'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

export type Zone = 'circuit' | 'garages' | 'platformer'
export type ControlMode = 'car' | 'platformer'

interface GameState {
  currentZone: Zone
  controlMode: ControlMode
  activeCheckpoint: number | null
  activeGarage: number | null
  activeStation: number | null
  checkpointsVisited: Set<number>
  allCheckpointsVisited: boolean
  setCurrentZone: (zone: Zone) => void
  setControlMode: (mode: ControlMode) => void
  setActiveCheckpoint: (id: number | null) => void
  setActiveGarage: (id: number | null) => void
  setActiveStation: (id: number | null) => void
  visitCheckpoint: (id: number) => void
}

const GameContext = createContext<GameState | null>(null)

export function GameStateProvider({ totalCheckpoints, children }: { totalCheckpoints: number; children: ReactNode }) {
  const [currentZone, setCurrentZone] = useState<Zone>('circuit')
  const [controlMode, setControlMode] = useState<ControlMode>('car')
  const [activeCheckpoint, setActiveCheckpoint] = useState<number | null>(null)
  const [activeGarage, setActiveGarage] = useState<number | null>(null)
  const [activeStation, setActiveStation] = useState<number | null>(null)
  const [checkpointsVisited, setCheckpointsVisited] = useState<Set<number>>(new Set())

  const visitCheckpoint = useCallback((id: number) => {
    setCheckpointsVisited(prev => {
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }, [])

  const allCheckpointsVisited = checkpointsVisited.size >= totalCheckpoints

  return (
    <GameContext.Provider value={{
      currentZone, controlMode, activeCheckpoint, activeGarage,
      activeStation, checkpointsVisited, allCheckpointsVisited,
      setCurrentZone, setControlMode, setActiveCheckpoint,
      setActiveGarage, setActiveStation, visitCheckpoint,
    }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGameState(): GameState {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGameState must be used within GameStateProvider')
  return ctx
}
