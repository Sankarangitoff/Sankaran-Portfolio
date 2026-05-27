'use client'

import { useMemo } from 'react'

interface CityBackdropProps {
  width?: number
  position?: [number, number, number]
}

export default function CityBackdrop({ width = 100, position = [0, 0, -20] }: CityBackdropProps) {
  const buildings = useMemo(() => {
    const b: { x: number; h: number; w: number; z: number; color: string }[] = []
    for (let i = 0; i < 30; i++) {
      b.push({
        x: (i / 30) * width - width / 2,
        h: 3 + Math.random() * 8,
        w: 1 + Math.random() * 2,
        z: -Math.random() * 10,
        color: `hsl(0, 0%, ${5 + Math.random() * 8}%)`,
      })
    }
    return b
  }, [width])

  return (
    <group position={position}>
      {buildings.map((b, i) => (
        <group key={i}>
          <mesh position={[b.x, b.h / 2, b.z]}>
            <boxGeometry args={[b.w, b.h, 1]} />
            <meshBasicMaterial color={b.color} />
          </mesh>
          {/* Random windows */}
          {Array.from({ length: Math.floor(b.h) }, (_, j) => (
            <mesh key={j} position={[b.x + (Math.random() - 0.5) * (b.w * 0.6), j + 1, b.z + 0.51]}>
              <planeGeometry args={[0.15, 0.15]} />
              <meshBasicMaterial color="#FF6B00" opacity={Math.random() * 0.3} transparent />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  )
}
