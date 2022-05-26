import React, { useState } from 'react';
import FnGraphCompare from '../components/FnGraphCompare';
import FnSelector from '../components/FnSelector';
import TimeButtons from '../components/TimeButtons';
import {
  SideBarDiv,
  FnGraphContainer,
  FnGrid,
  Scroll,
  FnSideBarWrapper,
} from '../styles';

type Props = {
  setCurrentView: Function;
  funcNames: string[];
  invocations: object[];
  duration: object[];
  errors: object[];
  cost: object[];
  throttles: object[];
  timePeriod: string;
  setTimePeriod: Function;
};

const Functions = (props: Props, { setCurrentView }: Props) => {
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
            <TimeButtons
              timePeriod={props.timePeriod}
              setTimePeriod={props.setTimePeriod}
            />
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
              name={'Cost'}
              width={'100%'}
              data={props.cost}
              unit={'$'}
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
