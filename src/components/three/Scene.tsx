'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import FloatingShapes from './FloatingShapes'

export default function Scene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <FloatingShapes />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  )
}
