import FunctionBtn from './fn-btn';
import React, { useEffect } from 'react';
import { dummyData } from '../Data/dummyData';

export default function DashboardMenu() {

  return (
    <>
      <div id="dashboardMenu">
        <h1>Accumulus Dashboard Menu Div</h1>
        <FunctionBtn />
        <button>Show me the STEP Functions!</button>
        <button>Show me the Cost Analysis!</button>
        <button>Show me the Company Analytics!</button>
      </div>
    </>
  );
};
