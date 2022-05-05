import React, { useState } from 'react';
import FnGraphCompare from '../components/FnGraphCompare';
import FunctionSelector from '../components/FunctionSelector';
import Sidebar from '../components/Sidebar';
import { DashSideBar, 
  DashboardGrid, 
  EvenDashGraphBox, 
  GraphContainer, Header, SelectContainer, Selector } from '../styles';

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
    <DashboardGrid>
      <Header>Functions</Header>
      <DashSideBar>
          <Sidebar />
      </DashSideBar>
      <EvenDashGraphBox>
            <FunctionSelector
              {...functions}
              onFunctions={onFunctions}
              setOnFunctions={setOnFunctions}
            />
        <GraphContainer>
          <FnGraphCompare
            onFunctions={onFunctions}
            name={'Invocations'}
            width={'100%'}
            data={props.invocations}
          />
        </GraphContainer>
        <GraphContainer>
          <FnGraphCompare
            onFunctions={onFunctions}
            name={'Duration'}
            width={'100%'}
            data={props.duration}
          />
        </GraphContainer>
        <GraphContainer>
          <FnGraphCompare
          onFunctions={onFunctions}
          name={'Errors'}
          width={'100%'}
          data={props.errors}
          />
        </GraphContainer>
      </EvenDashGraphBox>
      <GraphContainer>
        <FnGraphCompare
          onFunctions={onFunctions}
          name={'Memory Usage'}
          width={'100%'}
          data={props.memUsage}
        />
      </GraphContainer>
      <GraphContainer>
        <FnGraphCompare
          onFunctions={onFunctions}
          name={'Cost'}
          data={props.cost}
        />
      </GraphContainer>
      <GraphContainer>
        <FnGraphCompare
          onFunctions={onFunctions}
          name={'Throttles'}
          width={'100%'}
          data={props.throttles}
        />
      </GraphContainer>
       </DashboardGrid>
    </>

  );
};

export default Functions;
