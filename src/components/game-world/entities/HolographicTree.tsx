'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import type { SkillCategory } from '@/types/content'
import '@/components/game-world/effects/HologramShader'

interface HolographicTreeProps {
  category: SkillCategory
  visible: boolean
  position?: [number, number, number]
}

interface TreeNode {
  label: string
  isPrimary?: boolean
  x: number
  y: number
  children: TreeNode[]
}

function buildTree(category: SkillCategory): TreeNode {
  const subs = category.subcategories
  let leftGroup: { name: string; skills: string[] }
  let rightGroup: { name: string; skills: string[] }

  if (subs && subs.length >= 2) {
    leftGroup = subs[0]
    rightGroup = subs[1]
  } else {
    // Auto-split
    const mid = Math.ceil(category.skills.length / 2)
    leftGroup = { name: 'Group A', skills: category.skills.slice(0, mid).map(s => s.name) }
    rightGroup = { name: 'Group B', skills: category.skills.slice(mid).map(s => s.name) }
  }

  const skillMap = new Map(category.skills.map(s => [s.name, s.isPrimary]))

  const makeLeaves = (names: string[], baseX: number, y: number, spread: number): TreeNode[] =>
    names.map((name, i) => ({
      label: name,
      isPrimary: skillMap.get(name) ?? false,
      x: baseX + (i - (names.length - 1) / 2) * spread,
      y,
      children: [],
    }))

  return {
    label: category.name,
    x: 0,
    y: 4,
    children: [
      {
        label: leftGroup.name,
        x: -3,
        y: 2.5,
        children: makeLeaves(leftGroup.skills, -3, 1, 1.4),
      },
      {
        label: rightGroup.name,
        x: 3,
        y: 2.5,
        children: makeLeaves(rightGroup.skills, 3, 1, 1.4),
      },
    ],
  }
}

function TreeNodeMesh({ node, parentPos }: { node: TreeNode; parentPos?: [number, number] }) {
  const timeRef = useRef(0)
  const matRef = useRef<THREE.ShaderMaterial>(null)

  useFrame((_, delta) => {
    timeRef.current += delta
    if (matRef.current) {
      ;(matRef.current as unknown as { uTime: number }).uTime = timeRef.current
    }
  })

  const isRoot = !parentPos
  const isPrimary = node.isPrimary ?? true
  const nodeWidth = Math.max(node.label.length * 0.18, 1.2)

  // Create line geometry for branch from parent
  const branchGeo = useMemo(() => {
    if (!parentPos) return null
    const geo = new THREE.BufferGeometry()
    const positions = new Float32Array([parentPos[0], parentPos[1], 0, node.x, node.y, 0])
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [parentPos, node.x, node.y])

  const branchMat = useMemo(() => {
    return new THREE.LineBasicMaterial({ color: '#FF6B00', opacity: 0.5, transparent: true })
  }, [])

  const branchLine = useMemo(() => {
    if (!branchGeo) return null
    return new THREE.Line(branchGeo, branchMat)
  }, [branchGeo, branchMat])

  return (
    <group>
      {/* Branch line from parent */}
      {branchLine && <primitive object={branchLine} />}

      {/* Node background */}
      <mesh position={[node.x, node.y, 0]}>
        <planeGeometry args={[nodeWidth, 0.5]} />
        <hologramMaterial
          ref={matRef}
          uColor={new THREE.Color(isPrimary ? '#FF6B00' : '#444444')}
          uOpacity={isPrimary ? 0.6 : 0.3}
          transparent
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Node label */}
      <Text
        position={[node.x, node.y, 0.01]}
        fontSize={isRoot ? 0.3 : 0.2}
        color={isPrimary ? '#ffffff' : '#999999'}
        anchorX="center"
        anchorY="middle"
      >
        {node.label}
      </Text>

      {/* Children */}
      {node.children.map((child, i) => (
        <TreeNodeMesh key={i} node={child} parentPos={[node.x, node.y]} />
      ))}
    </group>
  )
}

export default function HolographicTree({ category, visible, position = [0, 0, 0] }: HolographicTreeProps) {
  const groupRef = useRef<THREE.Group>(null)
  const tree = useMemo(() => buildTree(category), [category])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    const target = visible ? 1 : 0
    groupRef.current.scale.lerp(new THREE.Vector3(target, target, target), delta * 3)
    groupRef.current.visible = groupRef.current.scale.x > 0.01
  })

  return (
    <group ref={groupRef} position={position} scale={[0, 0, 0]}>
      {/* Projection beam */}
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.02, 0.3, 4, 8, 1, true]} />
        <meshBasicMaterial color="#FF6B00" opacity={0.08} transparent side={THREE.DoubleSide} />
      </mesh>

      {/* Base ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[1.5, 1.7, 32]} />
        <meshBasicMaterial color="#FF6B00" opacity={0.3} transparent />
      </mesh>

      {/* Tree nodes */}
      <TreeNodeMesh node={tree} />
    </group>
  )
}
