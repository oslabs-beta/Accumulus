import React, { useState } from 'react';
import { useEffect } from 'react';
import Register from './Register';
import { useHistory } from 'react-router-dom';
import { LogInWrapper, LogInHeader, LogInFooter, LogInLeft, LogInBody } from '../styles';

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

              <button onClick={logBtnHandler}>Log In!</button>
              <button onClick={regBtnHandler}>Register</button>
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
          <h1>Lambda Monitoring Made Easy</h1>
          <p>Explain why Accumulus is amazing</p>
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
