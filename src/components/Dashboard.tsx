import React, { useEffect } from 'react';
import { filterProps } from 'recharts/types/util/types';
import FnGraph from './FnGraph';
import BarFnGraph from './BarFnGraph';

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
      <div id="dashboardMenu">
        <h1>Accumulus Dashboard Menu Div</h1>
        <FnGraph
          data={props.totalInvocations}
          name={'Total Invocations'}
          width={'30%'}
          height={300}
        />
        <FnGraph
          data={props.totalErrors}
          name={'Total Errors'}
          width={'30%'}
          height={300}
        />
        <FnGraph
          data={props.totalCost}
          name={'Total Cost'}
          width={'30%'}
          height={300}
        />
        <BarFnGraph
          data={props.slowestFuncs}
          name={'Slowest Functions'}
          width={'70%'}
          height={300}
        />
        {/* <BarFnGraph
          data={props.errorMsgs}
          name={'Error Messages'}
          width={'70%'}
          height={300}
        /> */}
        <BarFnGraph
          data={props.mostErroredFuncs}
          name={'Most Errored Functions'}
          width={'70%'}
          height={300}
        />
      </div>
    </>
  );
};

export default Dashboard;
