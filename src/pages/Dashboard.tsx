import React, { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import FnGraph from '../components/FnGraph';
import BarFnGraph from '../components/BarFnGraph';
import ErrorTable from '../components/ErrorTable';
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
  const { name, storeName, email, storeEmail } = useContext(UserContext);

  const updateRegion = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    props.setUserRegion(e.target.value);
  };

  return (
    <>
      <DashboardGrid>
        <SideBarDiv>
          <DashSideWrapper>
            <TimeButtons
              timePeriod={props.timePeriod}
              setTimePeriod={props.setTimePeriod}
            />
          </DashSideWrapper>
        </SideBarDiv>
        <SelectorBox>
          <RegionSelect>
            <select onChange={updateRegion}>
              <option value="us-east-2">Ohio (US-East-2)</option>
              {name !== 'Beff Jezos' ? (
                <option value="us-east-1">Virginia (US-East-1)</option>
              ) : (
                <></>
              )}
              <option value="us-west-1">California (US-West-1)</option>
              {name !== 'Beff Jezos' ? (
                <option value="us-west-2">Oregon (US-West-2)</option>
              ) : (
                <></>
              )}
            </select>
          </RegionSelect>
        </SelectorBox>
        <Row1GraphBox>
          <GraphContainer>
            <FnGraph
              tooltip={'Invocations'}
              data={props.totalInvocations}
              name={'Total Invocations'}
              width={'100%'}
            />
          </GraphContainer>
          <GraphContainer>
            <FnGraph
              tooltip={'Errors'}
              data={props.totalErrors}
              name={'Total Errors'}
              width={'100%'}
            />
          </GraphContainer>
        </Row1GraphBox>
        <Row2GraphBox>
          <GraphContainer>
            <FnGraph
              tooltip={'Cost'}
              data={props.totalCost}
              name={'Total Cost'}
              width={'100%'}
            />
          </GraphContainer>
          <GraphContainer>
            <BarFnGraph
              data={props.slowestFuncs}
              name={'Slowest Functions'}
              width={'100%'}
              tooltip={'Total Duration'}
            />
          </GraphContainer>
        </Row2GraphBox>
        <EvenDashGraphBox>
          <GraphContainer>
            <ErrorTable data={props.errorMsgs} />
          </GraphContainer>
          <GraphContainer>
            <BarFnGraph
              data={props.mostErroredFuncs}
              name={'Most Errored Functions'}
              width={'100%'}
              tooltip={'Total Errors'}
            />
          </GraphContainer>
        </EvenDashGraphBox>
      </DashboardGrid>
    </>
  );
};

export default Dashboard;
