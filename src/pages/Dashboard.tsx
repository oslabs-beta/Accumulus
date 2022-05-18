import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../../context/dataContext';
import { UserContext } from '../../context/userContext';
import { filterProps } from 'recharts/types/util/types';
import FnGraph from '../components/FnGraph';
import BarFnGraph from '../components/BarFnGraph';
import ErrorTable from '../components/ErrorTable';
import Sidebar from '../components/Navbar';
import TimeButtons from '../components/TimeButtons';
import {
  SideBarDiv,
  GraphContainer,
  DashboardGrid,
  Row1GraphBox,
  Row2GraphBox,
  EvenDashGraphBox,
  DashSideWrapper,
  SelectorBox,
  RegionSelect,
  PeriodSelect,
} from '../styles';

type Props = {
  setCurrentView: Function;
  totalInvocations: object[];
  totalErrors: object[];
  totalCost: object[];
  slowestFuncs: object[];
  errorMsgs: object[];
  mostErroredFuncs: object[];
  timePeriod: string;
  setTimePeriod: Function;
  setUserRegion: Function;
};

const Dashboard = (props: Props, { setCurrentView, setUserRegion }: Props) => {
  const { name, storeName, email, storeEmail } = useContext(UserContext)
  //console.log(name);
  //console.log(email);

  const updateRegion = (e: React.ChangeEvent<HTMLSelectElement>): void =>{
    props.setUserRegion(e.target.value);
  }

  return (
    <>
      <DashboardGrid>
        <SideBarDiv>
          <DashSideWrapper>
            <TimeButtons setTimePeriod={props.setTimePeriod} />
            {/* {props.timePeriod} */}
          </DashSideWrapper>
        </SideBarDiv>
        <SelectorBox>
          <RegionSelect>
            <select onChange={updateRegion}>
              <option value='us-east-2'>Ohio (US-East-2)</option>
              <option value='us-east-1'>Virginia (US-East-1)</option>
              <option value='us-west-1'>California (US-West-1)</option>
              <option value='us-west-2'>Oregon (US-West-2)</option>
            </select>
          </RegionSelect>
        </SelectorBox>
        <Row1GraphBox>
          <GraphContainer>
            <FnGraph
              data={props.totalInvocations}
              name={'Total Invocations'}
              width={'100%'}
              height={350}
            />
          </GraphContainer>
          <GraphContainer>
            <FnGraph
              data={props.totalErrors}
              name={'Total Errors'}
              width={'100%'}
              height={350}
            />
          </GraphContainer>
        </Row1GraphBox>
        <Row2GraphBox>
          <GraphContainer>
            <FnGraph
              data={props.totalCost}
              name={'Total Cost'}
              width={'100%'}
              height={350}
            />
          </GraphContainer>
          <GraphContainer>
            <BarFnGraph
              data={props.slowestFuncs}
              name={'Slowest Functions'}
              width={'100%'}
              height={350}
            />
          </GraphContainer>
        </Row2GraphBox>
        <EvenDashGraphBox>
          <GraphContainer>
            {/* -------------IMPORT LOG TABLE HERE:-------------- */}
            <ErrorTable data={props.errorMsgs} />
            {/* -------------IMPORT LOG TABLE HERE:-------------- */}
          </GraphContainer>
          {/* <GraphContainer>
            <h1
              style={{
                fontFamily: 'Roboto, sans-serif',
                fontWeight: '300',
                color: '#232323',
              }}
            >
              Logs
            </h1>
          </GraphContainer> */}
          <GraphContainer>
            <BarFnGraph
              data={props.mostErroredFuncs}
              name={'Most Errored Functions'}
              width={'100%'}
              height={350}
            />
          </GraphContainer>
        </EvenDashGraphBox>
      </DashboardGrid>
    </>
  );
};

export default Dashboard;
