import React, { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

interface props {
  userData: {
    arn: string;
    externalId: string;
    region: string;
  };
}

const FunctionBtn = (userData: props) => {
  const [passwordReg, setPasswordReg] = useState('');
  const [arnReg, setArnReg] = useState('');
  const [regionReg, setRegionReg] = useState('us-east-2');
  const [metricType, setMetricType] = useState('Invocations');
  const [timePeriod, setTimePeriod] = useState('7d');
  const [dataSum, setDataSum] = useState('Sum');
  //need externalId state
  //need state to store all function metrics
  let history = useHistory();

  const funcBtnHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const button: HTMLButtonElement = event.currentTarget;

    const body = JSON.stringify({
      arn: userData.userData.arn,
      externalId: userData.userData.externalId,
      region: userData.userData.region,
    });

    const funcMetrics = await fetch(
      `http://localhost:3000/api/aws/metricsAllFuncs/${metricType}/${timePeriod}/${dataSum}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body,
      }
    );
    console.log(funcMetrics);

    if (funcMetrics.status === 200) {
      //set state with funcMetrics

      console.log('redirecting from dashboard to functions...');
      history.push('/functions');
    } else {
      console.log('unsuccessful');
    }
  };

  return (
    <>
      <div id="fn-btn">
        <button onClick={funcBtnHandler}>Functions</button>
      </div>
    </>
  );
};

export default FunctionBtn;
