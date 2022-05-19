import * as THREE from 'three'
import React, { useEffect, useRef, forwardRef } from 'react'
import { ComputedAttribute } from '@react-three/drei'
import Perlin from 'perlin'

Perlin.seed(Math.random())

const computeFlowerDensity = (geometry) => {
  const position = geometry.getAttribute('position')
  const density = []
  const vertex = new THREE.Vector3()
  for (let i = 0; i < position.count; i++) {
    vertex.fromBufferAttribute(position, i)
    const p = vertex.clone().multiplyScalar(1)
    const n = Perlin.simplex3(...p.toArray())
    let m = THREE.MathUtils.mapLinear(n, -1, 1, 0, 1)
    if (m > 0.15) m = 0
    density.push(m)
  }
  return new THREE.Float32BufferAttribute(density, 1)
}

export const BlobGeometry = forwardRef((props, ref) => {
  const geom = useRef()

  useEffect(() => {
    const vertex = new THREE.Vector3()
    const normal = new THREE.Vector3()
    let newPositionAttribute = []
    const positionAttribute = geom.current.getAttribute('position')
    const normalAttribute = geom.current.getAttribute('normal')
    for (let i = 0; i < positionAttribute.count; i++) {
      vertex.fromBufferAttribute(positionAttribute, i)
      normal.fromBufferAttribute(normalAttribute, i)
      const v = vertex.multiplyScalar(0.5)
      const n = Perlin.simplex3(...v.toArray())
      vertex.add(normal.multiplyScalar(n * 0.3))
      newPositionAttribute.push(vertex.x, vertex.y, vertex.z)
    }
    geom.current.setAttribute('position', new THREE.Float32BufferAttribute(newPositionAttribute, 3))
    geom.current.attributes.position.needsUpdate = true
    geom.current.computeVertexNormals()
  }, [])

  return (
    <mesh ref={ref}>
      <icosahedronBufferGeometry args={[1.5, 16]} ref={geom}>
        <ComputedAttribute name="density" compute={computeFlowerDensity} usage={THREE.StaticReadUsage} />
      </icosahedronBufferGeometry>
      <meshBasicMaterial color="#221600" />
    </mesh>
  )
})
