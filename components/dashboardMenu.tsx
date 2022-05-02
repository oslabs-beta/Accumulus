import FunctionBtn from './fn-btn';
import React, { useEffect } from 'react';
import { useDataContext } from '../context/dataContext';
import { dummyData } from '../Data/dummyData';

export default function DashboardMenu() {
  const { data, receivedData } = useDataContext();
  const DATARESULT = JSON.stringify(data);
  const dummy = dummyData;
  const something =
    'THIS IS WHERE WE EITHER IMPORT DUMMY DATA OR MAKE THE FETCH REQUEST HELLO';

  //We need to invoke receivedData to change the default state of the data received.
  //However, because receivedData is option in the interface, error is occurring
  //if we make receivedData not optional in interface, we run into problem where default state is missing a required prop
  //from our interface

  // receivedData?.(something);
  useEffect(() => {
    receivedData?.(something);
  }, [receivedData]);

  return (
    <>
      <div id="dashboardMenu">
        <h1>Accumulus Dashboard Menu Div</h1>
        <h2>{DATARESULT}</h2>
        <FunctionBtn />
        <button>Show me the STEP Functions!</button>
        <button>Show me the Cost Analysis!</button>
        <button>Show me the Company Analytics!</button>
      </div>
    </>
  );
}
