import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Router from 'next/router';
import { useEffect } from 'react';

const FunctionBtn: React.FunctionComponent = () => {
  const router = useRouter();

  const [passwordReg, setPasswordReg] = useState('');
  const [arnReg, setArnReg] = useState('');
  const [regionReg, setRegionReg] = useState('us-east-2');
  const [metricType, setMetricType] = useState('Invocations');
  const [timePeriod, setTimePeriod] = useState('7d');
  const [dataSum, setDataSum] = useState('Sum');
  //need externalId state
  //need state to store all function metrics

  const funcBtnHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const button: HTMLButtonElement = event.currentTarget;

    const body = JSON.stringify({
      arn: arnReg,
      region: regionReg,
      // externalId: EXTERNAL_ID,
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

    // if (funcMetrics.status === 200) {
    //   //set state with funcMetrics

    //   console.log('redirecting from dashboard to functions...');
    router.push('/functions');
    // } else {
    //   console.log('unsuccessful');
    // }
  };

  return (
    <>
      <div id="fn-btn">
        <Link href="/functions" passHref>
          <button onClick={funcBtnHandler}>Functions</button>
        </Link>
      </div>
    </>
  );
};

export default FunctionBtn;
