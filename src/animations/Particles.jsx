import React from 'react'
import * as THREE from 'three'
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import CustomShaderMaterial from 'three-custom-shader-material'

export function Particles({ amount = 300, size = 0.01, opacity = 0.5 }) {
  const matRef = useRef()
  const positions = useMemo(() => new Float32Array(Array.from({ length: amount * 3 }, () => Math.random())), [length])
  useFrame(({ clock }) => (matRef.current.uniforms.u_time.value = clock.elapsedTime))
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attachObject={['attributes', 'position']} args={[positions, 3]} />
      </bufferGeometry>
      <CustomShaderMaterial
        ref={matRef}
        baseMaterial={THREE.PointsMaterial}
        size={size}
        opacity={opacity}
        transparent
        uniforms={{ u_time: { value: 0 } }}
        vertexShader={(/* glsl */ `
        uniform float u_time; 
        void main() {
          vec3 n = gln_curl(position + u_time * 0.005);
          // n.x = 0.;
          csm_Position = n * 2.;
        }
        `)}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}