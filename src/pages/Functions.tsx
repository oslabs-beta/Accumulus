import React, { useState } from 'react';
import FnGraphCompare from '../components/FnGraphCompare';
import FunctionSelector from '../components/FunctionSelector';

type Props = {
  arn: string;
  externalId: string;
  region: string;
  invocations: object[];
  duration: object[];
  errors: object[];
  memUsage: object[];
  cost: object[];
  throttles: object[];
};

const Functions = (props: Props) => {
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
  const { arn, externalId, region } = props;
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
      <FnGraphCompare
        onFunctions={onFunctions}
        name={'Invocations'}
        data={props.invocations}
      />
      <FnGraphCompare
        onFunctions={onFunctions}
        name={'Duration'}
        data={props.duration}
      />
      <FnGraphCompare
        onFunctions={onFunctions}
        name={'Errors'}
        data={props.errors}
      />
      <FnGraphCompare
        onFunctions={onFunctions}
        name={'Memory Usage'}
        data={props.memUsage}
      />
      <FnGraphCompare
        onFunctions={onFunctions}
        name={'Cost'}
        data={props.cost}
      />
      <FnGraphCompare
        onFunctions={onFunctions}
        name={'Throttles'}
        data={props.throttles}
      />
    </>
  );
};

export default Functions;
