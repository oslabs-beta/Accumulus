import React, { useEffect } from 'react';
import { filterProps } from 'recharts/types/util/types';
import FnGraph from '../components/FnGraph';
import BarFnGraph from '../components/BarFnGraph';
import ErrorTable from '../components/ErrorTable';
import Sidebar from '../components/Sidebar';
import {
  DashSideBar,
  GraphContainer,
  DashboardGrid,
  Header,
  Row1GraphBox,
  Row2GraphBox,
  EvenDashGraphBox
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
        {/* <Header>Accumulus Dashboard</Header> */}
        <DashSideBar>
          <Sidebar />
        </DashSideBar>
        <Row1GraphBox>
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
        </Row1GraphBox>
        <Row2GraphBox>
          <GraphContainer>
            <FnGraph
              data={props.totalCost}
              name={'Total Cost'}
              width={'100%'}
              height={300}
              />
          </GraphContainer>
          <GraphContainer>
            <BarFnGraph
              data={props.slowestFuncs}
              name={'Slowest Functions'}
              width={'100%'}
              height={300}
              />
          </GraphContainer>
        </Row2GraphBox>
        <EvenDashGraphBox>
          <GraphContainer>
            <h1 style={{ 
              fontFamily: 'Roboto, sans-serif', 
              fontWeight: '300', 
              color: '#232323'}}>
                Errors
            </h1>
            {/* -------------IMPORT LOG TABLE HERE:-------------- */}
            <h3>PLACEHOLDER FOR LOG CONTAINER GOES HERE</h3>
            <ErrorTable />
            {/* -------------IMPORT LOG TABLE HERE:-------------- */}
          </GraphContainer>
          <GraphContainer>
            <h1 style={{ 
              fontFamily: 'Roboto, sans-serif', 
              fontWeight: '300', 
              color: '#232323'}}>
                Logs
            </h1>
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
      </DashboardGrid>
    </>
  );
};

export default Dashboard;
