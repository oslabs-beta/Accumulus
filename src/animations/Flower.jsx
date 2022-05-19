import * as THREE from 'three'
import { forwardRef } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import { LayerMaterial, Texture } from 'lamina'
import React, { useState, useEffect, useMemo, FC } from 'react';

export const Flower = forwardRef((props, ref) => {
  const { nodes } = useGLTF('/models/flower.glb')
  const map = useTexture('/models/Sea_Thrift_vkbgaihha/Albedo_2K__vkbgaihha.jpg')
  const ao = useTexture('/models/Sea_Thrift_vkbgaihha/AO_2K__vkbgaihha.jpg')

  return (
    <group>
      <instancedMesh ref={ref} args={[undefined, undefined, 1000]} castShadow receiveShadow geometry={nodes._ndyj_Var10_LOD0.geometry} {...props}>
        <LayerMaterial lighting="standard" side={THREE.DoubleSide}>
          <Texture map={map} />
          <Texture map={ao} mode="multiply" />
        </LayerMaterial>
      </instancedMesh>
    </group>
  )
})
