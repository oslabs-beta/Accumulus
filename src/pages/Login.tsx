import React, { useState, useContext } from 'react';
import Register from './Register';
import { UserContext } from '../../context/userContext';
import { useHistory } from 'react-router-dom';
import {
  LoginPageContainer,
  LoginFormContainer,
  LoginButton,
  LoginInput,
  ErrorMessage,
  BackButton,
} from '../styles';
import { useForm } from 'react-hook-form';

type FormData = {
  email: string;
  password: string;
};

type Props = {
  setCurrentView: Function;
  setUserRegion: Function;
  setStart: Function;
};

const Login = ({ setCurrentView, setUserRegion, setStart }: Props) => {
  const { name, storeName, email, storeEmail } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [emailLog, setEmailLog] = useState('');
  const [passLog, setPassLog] = useState('');
  const [loginOrRegister, setLoginOrRegister] = useState('login');
  const [message, setMessage] = useState('');

  let history = useHistory();

  const onSubmit = async (data: FormData) => {
    const body = JSON.stringify({
      email: emailLog,
      password: passLog,
    });

    const login = await fetch('/api/user/login', {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      method: 'POST',
      body,
    });

    const response = await login.json();
    const region = response.region;
    const name = response.name;

    if (response.success === true) {
      storeName(name);
      setUserRegion(region);
      setCurrentView('dashboard');
      setStart(true);
      history.push('/home');
    } else {
      setMessage('Email not registered'); // todo: render something to show incorrect email/password
    }
  };

  const regBtnHandler = () => {
    setLoginOrRegister('register');
    history.push('/register'); // check if this sends user back to login with browser's back button
  };

  const backBtnHandler = () => {
    setCurrentView('splash');
    history.push('/');
  };

  return (
    <>
      <LoginPageContainer>
        {loginOrRegister === 'login' ? (
          <LoginFormContainer>
            <>
              <div style={{ textAlign: 'center' }}>
                <h1 style={{ marginBottom: '10px' }}>Sign In</h1>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  {/* <label>Email</label> */}
                  <br />
                  <div style={{ textAlign: 'center' }}>
                    <LoginInput
                      placeholder="Email Address"
                      {...register('email', {
                        required: true,
                        pattern:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      })}
                      type="text"
                      onChange={(e) => {
                        setEmailLog(e.target.value);
                      }}
                    />
                    <ErrorMessage>
                      {errors.email && (
                        <div className="errors">
                          Enter a valid email address
                        </div>
                      )}
                    </ErrorMessage>
                  </div>
                </div>
                <div>
                  {/* <label style={{ marginTop: '10px' }}>Password</label> */}
                  <br />
                  <div style={{ textAlign: 'center' }}>
                    <LoginInput
                      placeholder="Password"
                      {...register('password', { required: true })}
                      type="password"
                      onChange={(e) => {
                        setPassLog(e.target.value);
                      }}
                    />
                    <ErrorMessage>
                      {errors.password && (
                        <div className="errors">Enter your password</div>
                      )}
                    </ErrorMessage>
                  </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <LoginButton type="submit">Log In</LoginButton>
                  <br />
                  <br />
                  <u style={{ cursor: 'pointer' }} onClick={regBtnHandler}>
                    Don&apos;t have an account?
                  </u>
                  <BackButton onClick={backBtnHandler}>Back</BackButton>
                </div>
              </form>
            </>
          </LoginFormContainer>
        ) : (
          <Register
            setLoginOrRegister={setLoginOrRegister}
            setCurrentView={setCurrentView}
            setStart={setStart}
            setUserRegion={setUserRegion}
            backBtnHandler={backBtnHandler}
          />
        )}
      </LoginPageContainer>
    </>
  );
};

export default Login;
