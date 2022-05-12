import React, { useState } from 'react';
import FnGraphCompare from '../components/FnGraphCompare';
import FunctionSelector from '../components/FunctionSelector';
import Sidebar from '../components/Sidebar';
import {
  DashSideBar,
  DashboardGrid,
  EvenDashGraphBox,
  GraphContainer,
  Header,
  SelectContainer,
  Selector,
} from '../styles';

type Props = {
  setCurrentView: Function;
  funcNames: string[];
  invocations: object[];
  duration: object[];
  errors: object[];
  memUsage: object[];
  cost: object[];
  throttles: object[];
};

const Functions = (props: Props, { setCurrentView }: Props) => {
  const [metricType, setMetricType] = useState('Invocations');
  const [timePeriod, setTimePeriod] = useState('7d');
  const [dataSum, setDataSum] = useState('Sum');

  const [onFunctions, setOnFunctions] = useState({});

  return (
    <>
      <DashboardGrid>
        <Header>Functions</Header>
        <DashSideBar>
          <Sidebar setCurrentView={props.setCurrentView} />
        </DashSideBar>
        <EvenDashGraphBox>
          <FunctionSelector
            funcNames={props.funcNames}
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
