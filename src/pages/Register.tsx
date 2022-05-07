import { v4 as uuidv4 } from 'uuid';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { LogInButton, ButtonContainer, RegistrationWrapper, LogRegCont } from '../styles';
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

  const { register, setValue, handleSubmit, formState: { errors } } = useForm<FormData>();

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

  const  onSubmit = handleSubmit( data => {
    console.log('register button clicked')
    console.log(data.name);
    const n = data.name;
    console.log(n);
  // const regBtnHandler = 
  // async (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();

  //   const button: HTMLButtonElement = event.currentTarget;
    console.log(nameReg)
    setNameReg(n);
    console.log(nameReg);
    setEmailReg(data.email);
    setPasswordReg(data.password);
    setArnReg(data.arn);
    setRegionReg(data.region);
    setexternelid(data.externalId);


    const body = JSON.stringify({
      name: nameReg,
      email: emailReg,
      password: passwordReg,
      arn: arnReg,
      region: regionReg,
      externalId: EXTERNAL_ID,
    });

    console.log(body);

    // const register = await fetch('http://localhost:3000/api/user/signup', {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   method: 'POST',
    //   body,
    // });
    // console.log(register);

    // if (register.status === 200) {
    //   console.log('redirecting...');
    //   props.setCurrentView('dashboard');
    //   history.push('/home');
    // } else {
    //   console.log('unsuccessful');
    // }
  //}
  });

  return (
    <>
      <LogRegCont>
        <RegistrationWrapper>
          <h3>Sign Up for Accumulus!</h3><br/>
          <form onSubmit={onSubmit}>
            <div id='regInfo'>
              <div>
                <label>Name</label>
                <input {...register("name", {required: true})} />
                {
                  errors.name && <div className="errors"> Enter your name</div>
                }
              </div><br></br>
              <div>
                <label htmlFor="email">Email</label>
                <input {...register("email", 
                  {required: true,
                  pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })} type="text"/>
                  {
                  errors.email && <div className="errors"> Enter a valid email address</div>
                  }
              </div><br></br>
              <div>
                <label>Password</label>
                <input {...register("password", {required: true})} />
                  {
                  errors.password && <div className="errors"> Enter your password</div>
                  }
              </div><br />
            </div>

            <div className='arnInstructions'>
              Connection your AWS account to Accumulus by following the steps below:
              <br/>
              <ul style={{ "listStyle": "none"}}> 
                <li>
                <a
                  href={`https://console.aws.amazon.com/cloudformation/home#/stacks/create/review?stackName=accumulus-delegation&param_ExternalId=${EXTERNAL_ID}&templateURL=${YML}`}
                  target="_blank"
                  rel="noreferrer"
                  >
                  Add Accumulus CloudFormation stack to AWS.
                  </a>
                </li>
                <li>Make sure you check &quot;I acknowledge that AWS CloudFormation might create IAM resource.&quot;</li>
                <li>Click &quot;Create&quot;</li>
                <li>Once stack create has completed, head to the &quot;Outputs&quot; tab and look for your &quot;ARN&quot; string. Copy the &quot;ARN&quot; and paste into the field below.</li>
              </ul> 
            </div><br/>
            <div>
              <label>ARN</label>
              <input {...register("arn", {required: true})} />
                {
                  errors.arn && <div className="errors"> Enter your ARN</div>
                }
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
            <button type="submit">Sign me up!</button>
            <button onClick={() => props.setLoginOrRegister('login')}>Login</button>
          </form>
          {/* 
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
          <div className='arnInstructions'>
          Connection your AWS account to Accumulus by following the steps below:
          <br/>
          <ul style={{ "listStyle": "none"}}> 
            <li>
            <a
              href={`https://console.aws.amazon.com/cloudformation/home#/stacks/create/review?stackName=accumulus-delegation&param_ExternalId=${EXTERNAL_ID}&templateURL=${YML}`}
              target="_blank"
              rel="noreferrer"
              >
              Add Accumulus CloudFormation stack to AWS.
              </a>
            </li>
            <li>Make sure you check &quot;I acknowledge that AWS CloudFormation might create IAM resource.&quot;</li>
            <li>Click &quot;Create&quot;</li>
            <li>Once stack create has completed, head to the &quot;Outputs&quot; tab and look for your &quot;ARN&quot; string. Copy the &quot;ARN&quot; and paste into the field below.</li>
          </ul> 
          </div>
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
          {/* <br></br>
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
          </form> */} 
          {/* <div>
          <br/>
          <ButtonContainer>
          <LogInButton onClick={regBtnHandler}>Sign me up!</LogInButton>
          <button onClick={() => props.setLoginOrRegister('login')}>Login</button>
          </ButtonContainer>
          </div>
          </div> */}
        </RegistrationWrapper>
      </LogRegCont>
    </>
  )
};

export default Register;
