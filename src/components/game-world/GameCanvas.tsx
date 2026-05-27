'use client'

import { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import { GameStateProvider } from './GameState'
import AdaptiveCamera from './AdaptiveCamera'
import LoadingScreen from './LoadingScreen'
import SkillsCircuit from './zones/SkillsCircuit'
import Car, { type CarRef } from './entities/Car'
import CarControls from './controls/CarControls'
import GroundPlane from './environment/GroundPlane'
import Lighting from './environment/Lighting'
import type { Skills, Projects, Experience } from '@/types/content'

interface GameCanvas3DProps {
  skills: Skills
  projects: Projects
  experience: Experience
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- projects & experience will be used in later tasks (ProjectGarages, ExperiencePlatformer)
function GameScene({ skills, projects, experience }: GameCanvas3DProps) {
  const carRef = useRef<CarRef>(null)

  return (
    <>
      <AdaptiveCamera carRef={carRef} />
      <Lighting />

      <Physics gravity={[0, -9.81, 0]} debug={false}>
        <GroundPlane />
        <Car ref={carRef} startPosition={[25, 0.5, 0]} />
        <CarControls carRef={carRef} />
        <SkillsCircuit categories={skills.categories} />
      </Physics>
    </>
  )
}

export default function GameCanvas3D({ skills, projects, experience }: GameCanvas3DProps) {
  return (
    <GameStateProvider totalCheckpoints={skills.categories.length}>
      <div style={{ width: '100%', height: '100vh', position: 'relative', background: '#0A0A0A' }}>
        <LoadingScreen />
        <Canvas
          shadows
          camera={{ position: [0, 30, 20], fov: 50 }}
          dpr={[1, 2]}
          gl={{ antialias: true }}
        >
          <Suspense fallback={null}>
            <GameScene skills={skills} projects={projects} experience={experience} />
            <Preload all />
          </Suspense>
        </Canvas>

        {/* WASD prompt overlay */}
        <div style={{
          position: 'absolute',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          color: '#666',
          fontSize: 14,
          background: 'rgba(0,0,0,0.7)',
          padding: '8px 16px',
          borderRadius: 8,
          pointerEvents: 'none',
        }}>
          Use WASD or Arrow Keys to drive • Space to brake
        </div>
      </div>
    </GameStateProvider>
  )
}
