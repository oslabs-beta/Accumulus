import { StopMetricStreamsOutput } from '@aws-sdk/client-cloudwatch';
import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { useHistory } from 'react-router-dom';
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
  const { name, storeName, email, storeEmail } = useContext(UserContext);
  let history = useHistory();

  const startHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const cookieCheck = await fetch('/api/user/checkCoookies', {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      method: 'GET',
    });
    const response = await cookieCheck.json();
    if (response.name && response.arn && response.externalId && response.region) {
      setUserRegion(response.region)
      storeName(response.name)
      setCurrentView('dashboard');
      setStart(true);
      history.push('/home');
    } else {
      setCurrentView('login');
      history.push('/login');
    }
  };

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
