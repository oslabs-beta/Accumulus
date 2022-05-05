import React, { useState } from 'react';
import { useEffect } from 'react';
import Register from './Register';
import { useHistory } from 'react-router-dom';
import { LogInWrapper, 
  LogInHeader, 
  LogInFooter, 
  LogInLeft, 
  LogInBody, 
  LogInButton, 
  H1, Text, ButtonContainer, } from '../styles';
import Image from 'next/image';

type Props = {
  setCurrentView: Function;
  setUserData: Function;
};

const Login = ({ setCurrentView, setUserData }: Props) => {
  const [emailLog, setEmailLog] = useState('');
  const [passLog, setPassLog] = useState('');

  const [userArn, setUserArn] = useState('1');
  const [userExternalId, setUserExternalId] = useState('1');
  const [loginOrRegister, setLoginOrRegister] = useState('login');
  let history = useHistory();

  const logBtnHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const button: HTMLButtonElement = event.currentTarget;

    const body = JSON.stringify({
      email: emailLog,
      password: passLog,
    });

    const register = await fetch('http://localhost:3000/api/user/login', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body,
    });
    const response = await register.json();
    const arn = response.arn;
    const externalId = response.externalId;
    const region = response.region;

    if (response.success === true) {
      setUserData({ arn, externalId, region });
      console.log('redirecting...');
      setCurrentView('dashboard');
      history.push('/home');
    } else {
      console.log('unsucessful');
    }
  };

  const regBtnHandler = () => {
    setLoginOrRegister('register');
  };

  return (
    <>
      <LogInWrapper>
        <LogInHeader>
          <header>
              <h1>Accumulus</h1>

          

          {loginOrRegister === 'login' ? (
            <div id="login">
              
              <form className="registration-form">
                <input
                  type="text"
                  placeholder="Email"
                  required
                  onChange={(e) => {
                    setEmailLog(e.target.value);
                  }}
                />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  onChange={(e) => {
                    setPassLog(e.target.value);
                  }}
                />
              </form>
              <ButtonContainer>
                <LogInButton onClick={logBtnHandler}>Log In</LogInButton>
                <button onClick={regBtnHandler}>Register</button>
              </ButtonContainer>
            </div>
          ) : (
            <Register
              setLoginOrRegister={setLoginOrRegister}
              setCurrentView={setCurrentView}
            />
          )}
          <hr></hr>
          </header>
        </LogInHeader>
        <LogInBody>
          <H1>Lambda Monitoring Made Easy</H1>      
          <Text>Accumulus is an open source application for AWS Lambda data visualization and optimization</Text>
        {/* <Image src={'https://www.google.com/url?sa=i&url=https%3A%2F%2Ftaberextrusions.com%2F2015-marks-six-consecutive-years-of-growth-for-domestic-aluminum-extrusion-market%2Fgraph-up%2F&psig=AOvVaw0okZ_YAp4_2R-S_JS9b6So&ust=1651841042994000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCOC2pcixyPcCFQAAAAAdAAAAABAD'} alt={'Image of Graph'}></Image> */}
        </LogInBody>
        <LogInFooter>
          <footer>
            <hr></hr>
            <LogInLeft>
             <a href="www.github.com">Github</a>
            </LogInLeft>
            <p>Copyright 2022</p>
  
          </footer>
        </LogInFooter>
      </LogInWrapper>
    </>
  );
};

export default Login;
