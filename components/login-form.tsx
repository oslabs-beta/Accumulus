import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Router from 'next/router';
import { useEffect } from 'react';
import { useUserContext } from '../context/userContext';

const LoginForm: React.FunctionComponent = () => {
  const { user, setUser } = useUserContext();
  const USERRESULT = JSON.stringify(user);
  //Uncomment to setUser data
  const testUser = 'Test User Context: arn: 12345, externalId: 12345';
  setUser?.(testUser);
  
  // useEffect(() => {
  //   receivedData?.(something);
  // }, [receivedData]);

  const router = useRouter();
  const [emailLog, setEmailLog] = useState('');
  const [passLog, setPassLog] = useState('');
  const [loginState, setloginState] = useState(false);
  const [userArn, setUserArn] = useState('vsalud');
  const [userExternalId, setUserExternalId] = useState('1');

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
    console.log(register);
    const response = await register.json();
    console.log('login res body: ', response);
    console.log('RESPONSE ARN HERE:', response.arn);
    const arn = response.arn;
    console.log('SAVING ARN IN ANOTHER VAR', arn);

    if (response.success === true) {
      setloginState(true);
      setUser?.(arn);
      setUserArn(arn);
      console.log(USERRESULT);
      console.log(userArn);

      console.log('redirecting...');
      router.push('/dashboard');
    } else {
      //render a component for unsucessful login -> look at state
      console.log('unsucessful');
    }
  };

  return (
    <>
      <div id="login">
        <h4>{USERRESULT}</h4>
        <h3>Welcome to the Log In Page</h3>
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

        <button onClick={logBtnHandler}>Log IN!</button>
      </div>
    </>
  );
};

export default LoginForm;
