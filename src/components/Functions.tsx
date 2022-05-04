import React, { useState } from 'react';
import FuncGraph from './fn-graph';
import BarFuncGraph from './bar-func-graph';
import FunctionSelector from './FunctionSelector';

type Props = {
  arn: string;
  externalId: string;
  region: string;
};

const Functions = ({ arn, externalId, region }: Props) => {
  const [metricType, setMetricType] = useState('Invocations');
  const [timePeriod, setTimePeriod] = useState('7d');
  const [dataSum, setDataSum] = useState('Sum');

  const [onFunctions, setOnFunctions] = useState({});

  const functions = {
    names: [
      'AccumulusFunc1',
      'AccumulusFunc2',
      'AccumulusFunc3',
      'AccumulusFunc4',
      'AccumulusFunc5',
    ],
  };

  const body = JSON.stringify({
    arn,
    externalId,
    region,
  });
  console.log(body);

  const funcMetrics = fetch(
    `http://localhost:3000/api/aws/metricsAllFuncs/${metricType}/${timePeriod}/${dataSum}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body,
    }
  )
    .then((data) => data.json())
    .then((response) => console.log(response));

  return (
    <>
      <h2>Functions Page</h2>
      <FunctionSelector
        {...functions}
        onFunctions={onFunctions}
        setOnFunctions={setOnFunctions}
      ></FunctionSelector>
      <FuncGraph onFunctions={onFunctions}/>
      <BarFuncGraph />
    </>
  );
};

export default Functions;
