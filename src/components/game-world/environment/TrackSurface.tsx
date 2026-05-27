'use client'

import { useMemo } from 'react'
import * as THREE from 'three'

interface TrackSurfaceProps {
  radiusX?: number
  radiusZ?: number
  trackWidth?: number
  segments?: number
}

export default function TrackSurface({
  radiusX = 25,
  radiusZ = 15,
  trackWidth = 4,
  segments = 64,
}: TrackSurfaceProps) {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape()
    // Outer ellipse
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      const x = Math.cos(angle) * (radiusX + trackWidth / 2)
      const z = Math.sin(angle) * (radiusZ + trackWidth / 2)
      if (i === 0) shape.moveTo(x, z)
      else shape.lineTo(x, z)
    }
    // Inner ellipse (hole)
    const hole = new THREE.Path()
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      const x = Math.cos(angle) * (radiusX - trackWidth / 2)
      const z = Math.sin(angle) * (radiusZ - trackWidth / 2)
      if (i === 0) hole.moveTo(x, z)
      else hole.lineTo(x, z)
    }
    shape.holes.push(hole)

    const geo = new THREE.ShapeGeometry(shape, segments)
    geo.rotateX(-Math.PI / 2)
    return geo
  }, [radiusX, radiusZ, trackWidth, segments])

  // Dashed center line
  const centerLinePts = useMemo(() => {
    const pts: THREE.Vector3[] = []
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      pts.push(new THREE.Vector3(
        Math.cos(angle) * radiusX,
        0.02,
        Math.sin(angle) * radiusZ,
      ))
    }
    return pts
  }, [radiusX, radiusZ, segments])

  const centerLineGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(centerLinePts)
    return geo
  }, [centerLinePts])

  // Create dashed line material and line object for center line
  const centerLine = useMemo(() => {
    const material = new THREE.LineDashedMaterial({
      color: '#555555',
      dashSize: 0.8,
      gapSize: 0.5,
    })
    const line = new THREE.Line(centerLineGeo, material)
    line.computeLineDistances()
    return line
  }, [centerLineGeo])

  return (
    <group>
      {/* Track surface */}
      <mesh geometry={geometry} position={[0, 0.01, 0]} receiveShadow>
        <meshStandardMaterial color="#2a2a2a" roughness={0.85} metalness={0.1} />
      </mesh>

      {/* Center dashed line */}
      <primitive object={centerLine} />

      {/* Track edge lines */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radiusX + trackWidth / 2 - 0.05, radiusX + trackWidth / 2, 64]} />
        <meshBasicMaterial color="#FF6B00" opacity={0.3} transparent />
      </mesh>
    </group>
  )
}
