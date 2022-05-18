import { v4 as uuidv4 } from 'uuid';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  LoginButton,
  ButtonContainer,
  RegFormContainer,
  ErrorMessage,
} from '../styles';
import { useForm } from 'react-hook-form';

type FormData = {
  name: string;
  email: string;
  password: string;
  arn: string;
  region: string;
  externalId: string;
};

const Register = (props: any) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

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

  const onSubmit = async (data: FormData) => {
    console.log('register button clicked');

    const body = JSON.stringify({
      name: nameReg,
      email: emailReg,
      password: passwordReg,
      arn: arnReg,
      region: regionReg,
      externalId: EXTERNAL_ID,
    });

    console.log(body);

    const register = await fetch('/api/user/signup', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body,
    });
    console.log(register);

    if (register.status === 200) {
      console.log('redirecting...');
      props.setStart(true);
      props.setCurrentView('dashboard');
      history.push('/home');
    } else {
      console.log('unsuccessful');
    }
  };

  return (
    <>
      <RegFormContainer>
          <h3>Sign Up</h3>
          <br />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div id="regInfo">
              <div>
                <label>Name</label><br />
                <input
                  {...register('name', { required: true })}
                  onChange={(e) => {
                    setNameReg(e.target.value);
                  }}
                />
                <ErrorMessage>
                  {errors.name && (
                    <div className="errors"> Enter your name</div>
                  )}
                </ErrorMessage>
              </div>
              <br></br>
              <div>
                <label htmlFor="email">Email</label><br />
                <input
                  {...register('email', {
                    required: true,
                    pattern:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                  type="text"
                  onChange={(e) => {
                    setEmailReg(e.target.value);
                  }}
                />
                <ErrorMessage>
                  {errors.email && (
                    <div className="errors"> Enter a valid email address</div>
                  )}
                </ErrorMessage>
              </div>
              <br></br>
              <div>
                <label>Password</label><br />
                <input
                  type="password"
                  {...register('password', { required: true })}
                  onChange={(e) => {
                    setPasswordReg(e.target.value);
                  }}
                />
                <ErrorMessage>
                  {errors.password && (
                    <div className="errors"> Enter your password</div>
                  )}
                </ErrorMessage>
              </div>
              <br />
            </div>

            <div className="arnInstructions">
              Connection your AWS account to Accumulus by following the steps
              below:
              <br />
              <ul style={{ listStyle: 'none' }}>
                <li>
                  <a
                    href={`https://console.aws.amazon.com/cloudformation/home#/stacks/create/review?stackName=accumulus-delegation&param_ExternalId=${EXTERNAL_ID}&templateURL=${YML}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Add Accumulus CloudFormation stack to AWS.
                  </a>
                </li>
                <li>
                  Make sure you check &quot;I acknowledge that AWS
                  CloudFormation might create IAM resource.&quot;
                </li>
                <li>Click &quot;Create&quot;</li>
                <li>
                  Once stack create has completed, head to the
                  &quot;Outputs&quot; tab and look for your &quot;ARN&quot;
                  string. Copy the &quot;ARN&quot; and paste into the field
                  below.
                </li>
              </ul>
            </div>
            <br />

            <div>
              <label>ARN</label>
              <input
                {...register('arn', { required: true })}
                onChange={(e) => {
                  setArnReg(e.target.value);
                }}
              />
              <ErrorMessage>
                {errors.arn && <div className="errors"> Enter your ARN</div>}
              </ErrorMessage>
            </div>
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
              <option value="us-east-1">US East (N. Virginia) us-east-1</option>
              <option value="us-east-2">US East (Ohio) us-east-2</option>
              <option value="us-west-1">
                US West (N. California) us-west-1
              </option>
              <option value="us-west-2">US West (Oregon) us-west-2</option>
            </select>
            <br />
            <button type="submit">Sign me up!</button>
            <button onClick={() => props.setLoginOrRegister('login')}>
              Login
            </button>
          </form>
      </RegFormContainer>
    </>
  );
};

export default Register;
