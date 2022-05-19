import * as THREE from 'three'
import React, { cloneElement, useEffect, useRef } from 'react'
import { extend, useFrame } from '@react-three/fiber'
import { Sampler } from '@react-three/drei'
import { Depth, LayerMaterial } from 'lamina'
import Perlin from 'perlin.js'
import WindLayer from './WindLayer'
import { Flower } from './Flower'

Perlin.seed(Math.random())
extend({ WindLayer })

export function Grass({ children, strands = 50000, ...props }) {
  const geomRef = useRef()
  const meshRef = useRef(null)
  const windLayer = useRef(null)
  const flowerRef = useRef()

  useEffect(() => {
    meshRef.current.geometry.applyMatrix4(new THREE.Matrix4().makeRotationX(Math.PI / 2))
    meshRef.current.geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 0, 0.5))
    flowerRef.current.geometry.applyMatrix4(new THREE.Matrix4().makeRotationX(Math.PI / 2))
    flowerRef.current.geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 0, 0.5))
  }, [])

  useFrame(() => (windLayer.current.time += 0.005))

  return (
    <>
      {cloneElement(children, { ref: geomRef })}
      <instancedMesh ref={meshRef} args={[undefined, undefined, strands]} {...props}>
        <coneGeometry args={[0.05, 1.0, 2, 20, false, 0, Math.PI]} />
        <LayerMaterial side={THREE.DoubleSide} lighting="standard" envMapIntensity={1}>
          <Depth colorA="#221600" colorB="#ade266" near={0.14} far={1.52} mapping="world" />
          <windLayer
            args={[{ mode: 'multiply' }]}
            colorA="#ffffff"
            colorB="#acf5ce"
            noiseScale={10}
            noiseStrength={5}
            length={1.2}
            sway={0.5}
            ref={windLayer}
          />
        </LayerMaterial>
      </instancedMesh>
      <Flower ref={flowerRef} />
      <group>
        <Sampler
          transform={(props) => {
            const object = transform(props)
            const n = Perlin.simplex3(...props.position.clone().multiplyScalar(5).toArray())
            object.scale.setScalar(THREE.MathUtils.mapLinear(n, -1, 1, 0.3, 1) * 0.1)
            return object
          }}
          mesh={geomRef}
          instances={meshRef}
        />
        <Sampler transform={transform} mesh={geomRef} instances={flowerRef} weight="density" />
      </group>
    </>
  )
}

const transform = ({ position, normal, dummy: object }) => {
  object.scale.setScalar(Math.random() * 0.0075)
  object.position.copy(position)
  object.lookAt(normal.add(position))
  object.rotation.y += Math.random() - 0.5 * (Math.PI * 0.5)
  object.rotation.x += Math.random() - 0.5 * (Math.PI * 0.5)
  object.rotation.z += Math.random() - 0.5 * (Math.PI * 0.5)
  object.updateMatrix()
  return object
}