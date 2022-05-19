import * as THREE from 'three'
import { Abstract } from 'lamina/vanilla'
import React, { useState, useEffect, useMemo, FC } from 'react';

export default class WindLayer extends Abstract {
  static u_time = 0
  static u_sway = 0.5
  static u_length = 1
  static u_spherePos = new THREE.Vector3(0, 0, 0)
  static u_noiseScale = 10.0
  static u_noiseStrength = 10.0
  static u_colorA = new THREE.Color('#ade266').convertSRGBToLinear()
  static u_colorB = new THREE.Color('#ade266').convertSRGBToLinear()

  static vertexShader = `   
    uniform float u_time;
    uniform float u_sway;
    uniform float u_length;
    uniform vec3 u_spherePos;
    varying vec3 v_pos;
    
    vec3 main() {
      float cover = .25;
      vec3 pos = position.xyz;
      vec3 base = vec3(pos.x, pos.y, 0.0);
      vec4 baseGP = instanceMatrix * vec4(base, 1.0);
      v_pos = baseGP.xyz;
      vec2 noise = (lamina_noise_curl(baseGP.xyz * vec3(0.1) + u_time * 0.5 * u_sway)).xy;
      noise = smoothstep(-1.0, 1.0, noise);
      float swingX = sin(u_time * 2.0 + noise.x * 2.0 * PI) * pow(pos.z, 2.0);
      float swingY = cos(u_time * 2.0 + noise.y * 2.0 * PI) * pow(pos.z, 2.0);
      float d = distance(u_spherePos, baseGP.xyz);
      float radius = 0.75;
      float intensity = (1. - min(d, radius) / radius) * 0.5;
      pos.x += swingX + intensity;
      pos.y += swingY + intensity;
      return (pos * u_length);
    }
  `

  static fragmentShader = `
  varying vec3 v_pos;
  uniform float u_noiseScale;
  uniform float u_noiseStrength;
  uniform vec3 u_colorA;
  uniform vec3 u_colorB;

  vec4 main() {
    float n = lamina_noise_perlin(v_pos * u_noiseScale) * u_noiseStrength;
    vec3 c =  mix(u_colorB, u_colorA, n);
    return vec4(vec3(c), 1.);
  }
  `

  constructor(props) {
    super(WindLayer, {
      name: 'GrassLayer',
      ...props
    })
  }
}
