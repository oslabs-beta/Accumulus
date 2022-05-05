import React, { useEffect } from 'react';
import { filterProps } from 'recharts/types/util/types';
import FnGraph from '../components/FnGraph';
import BarFnGraph from '../components/BarFnGraph';
import Sidebar from '../components/Sidebar';
import {
  DashSideBar,
  GraphContainer,
  DashboardGrid,
  Header,
  EvenDashGraphBox,
  LongDashBox,
} from '../styles';

type Props = {
  totalInvocations: object[];
  totalErrors: object[];
  totalCost: object[];
  slowestFuncs: object[];
  errorMsgs: object[];
  mostErroredFuncs: object[];
};

const Dashboard = (props: Props) => {
  return (
    <>
      <DashboardGrid>
        <Header>Accumulus Dashboard</Header>
        <DashSideBar>
          <Sidebar />
        </DashSideBar>
        <EvenDashGraphBox>
          <GraphContainer>
            <FnGraph
              data={props.totalInvocations}
              name={'Total Invocations'}
              width={'100%'}
              height={300}
            />
          </GraphContainer>
          <GraphContainer>
            <FnGraph
              data={props.totalErrors}
              name={'Total Errors'}
              width={'100%'}
              height={300}
            />
          </GraphContainer>
          <GraphContainer>
           <BarFnGraph
              data={props.mostErroredFuncs}
              name={'Most Errored Functions'}
              width={'100%'}
              height={300}
            />
            
          </GraphContainer>
        </EvenDashGraphBox>
        <LongDashBox>
          <GraphContainer>
            <BarFnGraph
              data={props.slowestFuncs}
              name={'Slowest Functions'}
              width={'100%'}
              height={300}
            />
          </GraphContainer>
          <GraphContainer>
            <FnGraph
              data={props.totalCost}
              name={'Total Cost'}
              width={'100%'}
              height={300}
            />
          </GraphContainer>
        </LongDashBox>
      </DashboardGrid>
    </>
  );
};

export default Dashboard;
