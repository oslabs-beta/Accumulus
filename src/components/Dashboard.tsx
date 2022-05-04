import FunctionBtn from './FunctionButton';
import React, { useEffect } from 'react';

type Props = {
  userData: {
    arn: string;
    externalId: string;
    region: string;
  };
  //   setTimePeriod: Function;
  //   timePeriod: string;
  //   setMenuOpen: Function;
  //   chartData: { x: string; y: string }[] | undefined;
  //   totalInvocations: number;
  //   totalErrors: number;
  //   totalThrottles: number;
  //   mostActiveFunc: string | undefined;
  //   mostErrorFunc: string | undefined;
  //   allFuncLogs: {}[];
};

const Dashboard = (
  /*{
  setTimePeriod,
  timePeriod,
  setMenuOpen,
  chartData,
  totalInvocations,
  totalErrors,
  totalThrottles,
  mostActiveFunc,
  mostErrorFunc,
  allFuncLogs,
}*/
  userData: Props
) => {
  // const something =
  //   'THIS IS WHERE WE EITHER IMPORT DUMMY DATA OR MAKE THE FETCH REQUEST HELLO';

  return (
    <>
      <div id="dashboardMenu">
        <h1>Accumulus Dashboard Menu Div</h1>
        <FunctionBtn {...userData} />
        <button>Show me the STEP Functions!</button>
        <button>Show me the Cost Analysis!</button>
        <button>Show me the Company Analytics!</button>
      </div>
    </>
  );
};

export default Dashboard;
