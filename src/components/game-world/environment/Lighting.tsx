'use client'

export default function Lighting() {
  return (
    <>
      <ambientLight intensity={0.3} color="#ffffff" />
      <directionalLight
        position={[20, 30, 10]}
        intensity={0.8}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={100}
        shadow-camera-left={-40}
        shadow-camera-right={40}
        shadow-camera-top={40}
        shadow-camera-bottom={-40}
      />
      <hemisphereLight args={['#1a1a2e', '#0a0a0a', 0.4]} />
    </>
  )
}
