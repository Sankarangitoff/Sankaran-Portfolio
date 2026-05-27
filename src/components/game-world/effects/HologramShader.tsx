'use client'

import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import * as THREE from 'three'

const HologramMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color('#FF6B00'),
    uOpacity: 0.7,
    uScanlineSpeed: 0.5,
    uFlickerIntensity: 0.15,
  },
  // Vertex shader
  `
    varying vec2 vUv;
    varying vec3 vPosition;
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform float uTime;
    uniform vec3 uColor;
    uniform float uOpacity;
    uniform float uScanlineSpeed;
    uniform float uFlickerIntensity;
    varying vec2 vUv;
    varying vec3 vPosition;

    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }

    void main() {
      // Scanline effect
      float scanline = sin(vPosition.y * 30.0 + uTime * uScanlineSpeed) * 0.5 + 0.5;
      scanline = smoothstep(0.3, 0.7, scanline) * 0.15;

      // Flicker
      float flicker = 1.0 - random(vec2(floor(uTime * 10.0), 0.0)) * uFlickerIntensity;

      // Edge glow
      float edgeGlow = 1.0 - smoothstep(0.0, 0.1, min(vUv.x, min(1.0 - vUv.x, min(vUv.y, 1.0 - vUv.y))));

      float alpha = (uOpacity + scanline + edgeGlow * 0.3) * flicker;
      gl_FragColor = vec4(uColor, alpha);
    }
  `
)

extend({ HologramMaterial })

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      hologramMaterial: THREE.ShaderMaterialParameters & {
        ref?: React.Ref<THREE.ShaderMaterial>
        uTime?: number
        uColor?: THREE.Color
        uOpacity?: number
        uScanlineSpeed?: number
        uFlickerIntensity?: number
      }
    }
  }
}

export default HologramMaterial
