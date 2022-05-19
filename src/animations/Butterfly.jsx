import * as THREE from 'three'
import { useRef, useEffect, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'
import { FBM } from 'three-noise'
import React, { useState, useEffect, useMemo, FC } from 'react';

const vec = new THREE.Vector2()
export function Butterfly(props) {
  const group = useRef()
  const { scene, animations } = useGLTF('/models/butterfly.glb')
  const cloneScene = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { actions } = useAnimations(animations, group)
  const [fbm] = useState(() => new FBM({ seed: Math.random() }))
  const [offset] = useState(() => Math.random() * 100)

  useEffect(() => {
    actions['ArmatureAction.001'].setEffectiveTimeScale(6)
    const timeout = setTimeout(() => actions['ArmatureAction.001'].play(), Math.random() * 1000)
    group.current.rotation.y = offset
    return () => {
      clearTimeout(timeout)
      actions['ArmatureAction.001']?.stop()
    }
  }, [])

  useFrame(({ clock }, dt) => {
    vec.set(clock.elapsedTime, clock.elapsedTime)
    group.current.position.set(0, fbm.get2(vec), 0)
    group.current.rotation.y -= dt
  })

  return (
    <group ref={group} dispose={null}>
      <group {...props}>
        <group scale={0.1} rotation-y={Math.PI / 4} position-y={THREE.MathUtils.randFloat(-3, 1)}>
          <primitive object={cloneScene} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/scene (3).glb')