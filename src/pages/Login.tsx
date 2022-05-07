import React, { useState, useEffect } from 'react';
import Register from './Register';
import { useHistory } from 'react-router-dom';
import { LogInWrapper, 
  LogInHeader, 
  LogInFooter, 
  LogInLeft, 
  LogInBody, 
  LogInButton, 
  H1, Text, ButtonContainer, } from '../styles';
  import { useForm } from "react-hook-form";

type FormData = {
    email: string;
    password: string;
  };

type Props = {
  setCurrentView: Function;
  setUserData: Function;
};


const Login = ({ setCurrentView, setUserData }: Props) => {
  

  const { register, setValue, handleSubmit, formState: { errors } } = useForm<FormData>();

  const [emailLog, setEmailLog] = useState('');
  const [passLog, setPassLog] = useState('');
  const [userArn, setUserArn] = useState('1');
  const [userExternalId, setUserExternalId] = useState('1');
  const [loginOrRegister, setLoginOrRegister] = useState('login');


  let history = useHistory();
  // const onSubmit = handleSubmit(data => console.log(data, 'this is where the logBtnHandler logic should go'));
  const onSubmit = handleSubmit( data => {
    console.log('login button clicked')
    console.log(data);
  // const logBtnHandler = 
  async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const button: HTMLButtonElement = event.currentTarget;

    setEmailLog(data.email);
    setPassLog(data.password);

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
  }});

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

          <form onSubmit={onSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              {/* <input ref={register} id="email" name="email" type="email"/> */}
              <input {...register("email", 
              {required: true,
              pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })} type="text"/>
              {
                errors.email && <div className="errors"> Enter a valid email address</div>
              }
            </div>
            <div>
              <label>Password</label>
              <input {...register("password", {required: true})} />
              {
                errors.password && <div className="errors"> Enter your password</div>
              }
            </div>
            <button
              type="submit"
              // onClick={() => {
              //   setValue("password", "pass"); 
              // }}
            >
              Log In
            </button>
            <button onClick={regBtnHandler}>Register</button>
          </form>

              {/* <form className="registration-form">
                <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  
                  onChange={(e) => {
                    setEmailLog(e.target.value);
                  }}
                />
                </div>
                <br></br>
                <div>
                <input
                  type="password" required
                  placeholder="Password"
                  
                  onChange={(e) => {
                    setPassLog(e.target.value);
                  }}
                />
                </div>
                <br></br>
                <ButtonContainer>
                <LogInButton onClick={logBtnHandler} type="submit">Log In</LogInButton>
                <br></br><br/>
                <button onClick={regBtnHandler}>Register</button>
              </ButtonContainer>
            
              </form> */}

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
