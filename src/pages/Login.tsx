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
          {loginOrRegister === 'login' ? (
            <div id="login">
              <h1>Sign In to Accumulus</h1>
              <br/>
              <form className="registration-form">
                <div>
                <input
                  type="text"
                  placeholder="Email"
                  required
                  onChange={(e) => {
                    setEmailLog(e.target.value);
                  }}
                />
                </div>
                <br></br>
                <div>
                <input
                  type="password"
                  placeholder="Password"
                  required
                  onChange={(e) => {
                    setPassLog(e.target.value);
                  }}
                />
                </div>
                <br></br>
              </form>
              <ButtonContainer>
                <LogInButton onClick={logBtnHandler}>Log In</LogInButton>
                <br></br><br/>
                <button onClick={regBtnHandler}>Register</button>
              </ButtonContainer>
            </div>
          ) : (
            <Register
              setLoginOrRegister={setLoginOrRegister}
              setCurrentView={setCurrentView}
            />
          )}
      </LogInWrapper>
    </>
  );
};

export default Login;
