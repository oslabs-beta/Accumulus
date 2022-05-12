import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  LogInWrapper,
  LogInHeader,
  LogInFooter,
  LogInLeft,
  LogInBody,
  StartedButton,
  H1,
  Text,
  ButtonContainer,
} from '../styles';

type Props = {
  setUserRegion: Function;
  setCurrentView: Function;
};

const Splash = ({ setCurrentView, setUserRegion }: Props) => {
  let history = useHistory();

  const startHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Get Started was clicked');
    console.log('SOMETHING HERE',document.cookie)
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
      console.log('cookies are here, redirect to dashboard');
      setCurrentView('dashboard');
      history.push('/home');
    } else {
      console.log('no cookies, redirect to log in');
      setCurrentView('login');
      history.push('/login');
    }
  };

  return (
    <>
      <LogInBody>
        <H1>Lambda Monitoring Made Easy</H1>
        <Text>
          Accumulus is an open source application for AWS Lambda data
          visualization and cost optimization
        </Text>
        {/* <Image src={'https://www.google.com/url?sa=i&url=https%3A%2F%2Ftaberextrusions.com%2F2015-marks-six-consecutive-years-of-growth-for-domestic-aluminum-extrusion-market%2Fgraph-up%2F&psig=AOvVaw0okZ_YAp4_2R-S_JS9b6So&ust=1651841042994000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCOC2pcixyPcCFQAAAAAdAAAAABAD'} alt={'Image of Graph'}></Image> */}
        <StartedButton onClick={startHandler}>Get Started</StartedButton>
      </LogInBody>
      <LogInFooter>
        <footer>
          <LogInLeft>
            <a href="www.github.com">Github</a>
          </LogInLeft>
          <p>Copyright 2022</p>
        </footer>
      </LogInFooter>
    </>
  );
};

export default Splash;
