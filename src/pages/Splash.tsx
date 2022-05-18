import { StopMetricStreamsOutput } from '@aws-sdk/client-cloudwatch';
import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber'


import {
  SplashFooter,
  SplashLeft,
  SplashBody,
  StartedButton,
  H1,
  Text,
} from '../styles';

type Props = {
  setUserRegion: Function;
  setCurrentView: Function;
  setStart: Function;
};



const Splash = ({ setCurrentView, setUserRegion, setStart }: Props) => {
  let history = useHistory();

  const startHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    // console.log('Get Started was clicked');
    if (
      document.cookie // "arn=fhdkjashfkdh; externalId=fhdjkashf;  "
        .split(';')
        .some((item) => item.trim().startsWith('arn=')) &&
      document.cookie
        .split(';')
        .some((item) => item.trim().startsWith('externalId=')) &&
      document.cookie
        .split(';')
        .some((item) => item.trim().startsWith('region='))
    ) {
      // console.log('cookies are here, redirect to dashboard');
      setCurrentView('dashboard');
      setStart(true);
      history.push('/home');
    } else {
      // console.log('no cookies, redirect to log in');
      setCurrentView('login');
      history.push('/login');
    }
  };



  function Box(props: JSX.IntrinsicElements['mesh']) {
    const mesh = useRef<THREE.Mesh>(null!)
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    useFrame((state, delta) => (mesh.current.rotation.x += 0.01))
    return (
      <mesh
        {...props}
        ref={mesh}
        scale={active ? 1.5 : 1}
        onClick={(event) => setActive(!active)}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}>
        <boxGeometry args={[1, 1, 2]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      </mesh>
    )
  }



  return (
    <>
      <SplashBody>
        <H1>Lambda Monitoring Made Easy</H1>
        <Text>
          Accumulus is an open source application for AWS Lambda data
          visualization and cost optimization
        </Text>
        {/* <Image src={'https://www.google.com/url?sa=i&url=https%3A%2F%2Ftaberextrusions.com%2F2015-marks-six-consecutive-years-of-growth-for-domestic-aluminum-extrusion-market%2Fgraph-up%2F&psig=AOvVaw0okZ_YAp4_2R-S_JS9b6So&ust=1651841042994000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCOC2pcixyPcCFQAAAAAdAAAAABAD'} alt={'Image of Graph'}></Image> */}
        <StartedButton onClick={startHandler}>Get Started</StartedButton>
        <Canvas>
          {/* <ambientLight /> */}
          <ambientLight intensity={0.5} />
          {/* <directionalLight position={[0, 0, 5]} /> */}
          <pointLight position={[10, 10, 10]} />
          <Box position={[-1.2, 1, 1]} />
          <Box position={[1.2, 2, 0]} />
        </Canvas>,
      </SplashBody>
      <SplashFooter>
        <footer>
          <SplashLeft>
            <a href="www.github.com">Github</a>
          </SplashLeft>
          <p>Copyright 2022</p>
        </footer>
      </SplashFooter>
    </>
  );
};

export default Splash;
