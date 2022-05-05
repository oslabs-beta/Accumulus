import { v4 as uuidv4 } from 'uuid';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { LogInButton, ButtonContainer, RegistrationWrapper } from '../styles';

const Register = (props: any) => {
  const [nameReg, setNameReg] = useState('');
  const [emailReg, setEmailReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');
  const [arnReg, setArnReg] = useState('');
  const [regionReg, setRegionReg] = useState('us-east-2');
  const [EXTERNAL_ID, setexternelid] = useState(uuidv4());

  let history = useHistory();

  useEffect(() => {
    setexternelid(uuidv4());
  }, []);

  const YML = `https://accumulus.s3.us-east-2.amazonaws.com/cloudformation.yml`;

  const regBtnHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const button: HTMLButtonElement = event.currentTarget;

    const body = JSON.stringify({
      name: nameReg,
      email: emailReg,
      password: passwordReg,
      arn: arnReg,
      region: regionReg,
      externalId: EXTERNAL_ID,
    });

    console.log(body);

    const register = await fetch('http://localhost:3000/api/user/signup', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body,
    });
    console.log(register);

    if (register.status === 200) {
      console.log('redirecting...');
      props.setCurrentView('dashboard');
      history.push('/home');
    } else {
      console.log('unsuccessful');
    }
  };

  return (
    <>
    <RegistrationWrapper>
      <div id="registration">
        <h3>Sign Up for Accumulus!</h3>
        <form className="registration-form">
          <div id='regInfo'>
            <div>
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => {
                setNameReg(e.target.value);
              }}
              required
            />
            </div>
            <br></br>
            <div>
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => {
                setEmailReg(e.target.value);
              }}
              required
            />
            </div>
            <br></br>
            <div>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPasswordReg(e.target.value);
              }}
              required
            />
            </div>
            <br />
          </div>
          <a
          href={`https://console.aws.amazon.com/cloudformation/home#/stacks/create/review?stackName=accumulus-delegation&param_ExternalId=${EXTERNAL_ID}&templateURL=${YML}`}
          target="_blank"
          rel="noreferrer"
          >
          Please visit this link to get your ARN
          </a>
          <br/>
          <div>
          <input
            type="text"
            placeholder="ARN"
            onChange={(e) => {
              setArnReg(e.target.value);
            }}
            required
          />
          </div>
          {/* <input type="text" placeholder="Region"
            onChange={(e) => {
              setRegionReg(e.target.value)
            }}
          /> */}
          <br></br>
          <label htmlFor="region">Choose your region:</label>
          <br></br>
          <select
            required
            id="region"
            name="region"
            onChange={(e) => {
              setRegionReg(e.target.value);
            }}
          >
            <option value="us-east-2">US East (Ohio)</option>
            <option value="us-east-1">US East (N. Virginia)</option>
            <option value="us-west-1">US West (N. California)</option>
            <option value="us-west-2">US West (Oregon)</option>
          </select>
          <br/>
        </form>
        <div>
          <br/>
        <ButtonContainer>
          <LogInButton onClick={regBtnHandler}>Sign me up!</LogInButton>
          <button onClick={() => props.setLoginOrRegister('login')}>Login</button>
        </ButtonContainer>
        </div>
      </div>
      </RegistrationWrapper>
    </>
  );
};

export default Register;
