import React, { useState } from 'react';
import FnGraphCompare from '../components/FnGraphCompare';
import FnSelector from '../components/FnSelector';
import TimeButtons from '../components/TimeButtons';
import Sidebar from '../components/Navbar';
import {
  SideBarDiv,
  FnGraphContainer,
  FnGrid,
  Scroll,
  FnSideBarWrapper
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
  timePeriod: string;
  setTimePeriod: Function;
};

const Functions = (props: Props, { setCurrentView }: Props) => {
  const [metricType, setMetricType] = useState('Invocations');
  const [timePeriod, setTimePeriod] = useState('7d');
  const [dataSum, setDataSum] = useState('Sum');

  const [onFunctions, setOnFunctions] = useState({});

  return (
    <>
      <FnGrid>
        <SideBarDiv>
          <FnSideBarWrapper>
          <FnSelector
            funcNames={props.funcNames}
            onFunctions={onFunctions}
            setOnFunctions={setOnFunctions}
          />
          <TimeButtons setTimePeriod={props.setTimePeriod} />
          {/* {props.timePeriod} */}
          </FnSideBarWrapper> 
        </SideBarDiv>
        <Scroll>
          <FnGraphContainer>
            <FnGraphCompare
              onFunctions={onFunctions}
              name={'Invocations'}
              width={'100%'}
              data={props.invocations}
            />
          </FnGraphContainer>
          <FnGraphContainer>
            <FnGraphCompare
              onFunctions={onFunctions}
              name={'Duration'}
              width={'100%'}
              data={props.duration}
            />
          </FnGraphContainer>
          <FnGraphContainer>
            <FnGraphCompare
              onFunctions={onFunctions}
              name={'Errors'}
              width={'100%'}
              data={props.errors}
            />
          </FnGraphContainer>

          <FnGraphContainer>
            <FnGraphCompare
              onFunctions={onFunctions}
              name={'Memory Usage'}
              width={'100%'}
              data={props.memUsage}
            />
          </FnGraphContainer>
          <FnGraphContainer>
            <FnGraphCompare
              onFunctions={onFunctions}
              name={'Cost'}
              data={props.cost}
            />
          </FnGraphContainer>
          <FnGraphContainer>
            <FnGraphCompare
              onFunctions={onFunctions}
              name={'Throttles'}
              width={'100%'}
              data={props.throttles}
            />
          </FnGraphContainer>
        </Scroll>
      </FnGrid>
    </>
  );
};

export default Functions;
